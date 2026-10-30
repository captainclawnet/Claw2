"""Generate a disposable Pages site from the single-source GitHub asset releases.

The build repository stores only the web executable and this generator. Asset
bytes are downloaded and hash-checked into a Pages deployment artifact, not Git.
"""
import argparse
from concurrent.futures import ThreadPoolExecutor
import hashlib
import json
import os
from pathlib import Path
import re
import time
from urllib.error import HTTPError, URLError
from urllib.parse import urlsplit
from urllib.request import Request, urlopen

PACKS = ('BaseAssets', 'BR', 'DE', 'EN', 'ES', 'JP', 'PL', 'RU')
MAX_FILE = 256 * 1024 * 1024


def sha(data):
    return hashlib.sha256(data).hexdigest()


def download(url, limit, token=None):
    headers = {'User-Agent': 'Claw2-Pages-Cache', 'Accept': 'application/vnd.github+json'}
    if token:
        if urlsplit(url).netloc != 'api.github.com':
            raise ValueError('Credentials must only be sent to the GitHub API')
        headers['Authorization'] = 'Bearer ' + token
    for attempt in range(4):
        try:
            with urlopen(Request(url, headers=headers), timeout=120) as response:
                data = response.read(limit + 1)
                if len(data) > limit:
                    raise ValueError('Asset exceeds size limit')
                return data
        except (HTTPError, URLError, TimeoutError) as error:
            if isinstance(error, HTTPError) and error.code not in (429, 500, 502, 503, 504):
                raise
            if attempt == 3:
                raise
            time.sleep(2 ** attempt)


def validate(manifest, pack, tag):
    if (manifest.get('schema') != 1 or manifest.get('pack') != pack
            or manifest.get('repository') != 'captainclawnet/' + pack
            or manifest.get('install_root') != ('BaseAssets' if pack == 'BaseAssets' else 'LangAssets/' + pack)
            or manifest.get('tag') != tag or 'v' + manifest.get('version', '') != tag
            or not re.fullmatch(r'v(0|[1-9][0-9]{0,8})\.(0|[1-9][0-9]{0,8})\.(0|[1-9][0-9]{0,8})', tag)):
        raise ValueError('Invalid manifest identity: ' + pack)
    files = manifest.get('files')
    if not isinstance(files, list) or not 1 <= len(files) <= 999:
        raise ValueError('Invalid manifest inventory')
    paths, assets = set(), set()
    for entry in files:
        path = entry['path']
        if not isinstance(path, str) or re.search(r'[\x00-\x1f\\:<>"|?*]', path):
            raise ValueError('Invalid path')
        for part in path.split('/'):
            if (not part or part in ('.', '..') or part.endswith((' ', '.'))
                    or re.fullmatch(r'(?i:CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])', part.split('.')[0])):
                raise ValueError('Unsafe path')
        if (path.casefold() in paths or entry['asset'] in assets
                or entry['asset'] != 'f-' + sha(path.encode('utf-8'))
                or type(entry['size']) is not int or not 0 <= entry['size'] <= MAX_FILE
                or not re.fullmatch('[a-f0-9]{64}', entry['sha256'])):
            raise ValueError('Invalid file entry')
        paths.add(path.casefold())
        assets.add(entry['asset'])
    for path in paths:
        parts = path.split('/')
        if any('/'.join(parts[:i]) in paths for i in range(1, len(parts))):
            raise ValueError('File/directory collision')


def build_site(web, output, token=None, check_url=None, fetch=download):
    # Explicit allowlist prevents stale .data bundles, credentials or local files
    # from entering the published site.
    web_files = {name: (web / name).read_bytes() for name in ('Claw2.html', 'Claw2.js', 'Claw2.wasm')}
    if b'claw-config.js' not in web_files['Claw2.html']:
        raise ValueError('Rebuild the web target: deployment configuration hook is missing')
    if b'Claw2.data' in web_files['Claw2.js']:
        raise ValueError('Rebuild without embedded assets before publishing')
    index = {'schema': 1, 'web': {name: sha(data) for name, data in web_files.items()}, 'packs': {}}
    releases = []
    for pack in PACKS:
        release = json.loads(fetch(f'https://api.github.com/repos/captainclawnet/{pack}/releases/latest', 2*1024*1024, token))
        tag = release['tag_name']
        if release['draft'] or release['prerelease'] or not re.fullmatch(r'v[0-9]+\.[0-9]+\.[0-9]+', tag):
            raise ValueError('Invalid stable release: ' + pack)
        base = f'https://github.com/captainclawnet/{pack}/releases/download/{tag}/'
        raw = fetch(base + 'manifest.json', 2*1024*1024)
        manifest = json.loads(raw)
        validate(manifest, pack, tag)
        asset = next((a for a in release.get('assets', []) if a['name'] == 'manifest.json'), None)
        if asset and asset.get('digest') and asset['digest'] != 'sha256:' + sha(raw):
            raise ValueError('Manifest digest mismatch: ' + pack)
        index['packs'][pack] = {'tag': tag, 'manifest_sha256': sha(raw)}
        releases.append((pack, base, raw, manifest))
    if check_url:
        try:
            if json.loads(fetch(check_url, 2*1024*1024)) == index:
                print('No web or asset changes; keeping the current Pages deployment.')
                return False
        except (HTTPError, URLError, TimeoutError, ValueError):
            pass
    total = sum(e['size'] for _, _, _, m in releases for e in m['files'])
    if total + sum(map(len, web_files.values())) > 950 * 1024 * 1024:
        raise ValueError('Generated site is too close to the 1 GiB Pages limit')
    output.mkdir(parents=True, exist_ok=False)
    # Content-address the executable files so a cached HTML/JS never loads a
    # different WASM version during deployment propagation.
    wasm_name = 'Claw2-' + sha(web_files['Claw2.wasm'])[:16] + '.wasm'
    script = web_files['Claw2.js'].replace(b'Claw2.wasm', wasm_name.encode())
    js_name = 'Claw2-' + sha(script)[:16] + '.js'
    (output / wasm_name).write_bytes(web_files['Claw2.wasm'])
    (output / js_name).write_bytes(script)
    (output / 'index.html').write_bytes(web_files['Claw2.html'].replace(b'Claw2.js', js_name.encode()))
    (output / 'Claw2.html').write_bytes((output / 'index.html').read_bytes())
    (output / '.nojekyll').write_text('')
    (output / 'claw-config.js').write_text("globalThis.CLAW_ASSET_BASE_URL = new URL('assets/', document.baseURI).href;\n")
    for pack, base, raw, manifest in releases:
        folder = output / 'assets' / pack / manifest['tag']
        folder.mkdir(parents=True)
        (folder / 'manifest.json').write_bytes(raw)
        def file(entry):
            data = fetch(base + entry['asset'], entry['size'])
            if len(data) != entry['size'] or sha(data) != entry['sha256']:
                raise ValueError('Asset digest/size mismatch: ' + pack + '/' + entry['path'])
            (folder / entry['asset']).write_bytes(data)
        with ThreadPoolExecutor(max_workers=4) as workers:
            list(workers.map(file, manifest['files']))
        (folder.parent / 'latest.json').write_bytes(raw)
        print(f"Cached {pack} {manifest['tag']}: {len(manifest['files'])} files", flush=True)
    (output / 'release-index.json').write_text(json.dumps(index, separators=(',', ':')) + '\n', encoding='utf-8')
    print(f'Generated Pages site: {output}; asset bytes: {total}')
    return True


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--web', type=Path, default=Path('web'))
    parser.add_argument('--output', type=Path, default=Path('_site'))
    parser.add_argument('--check-url', help='Skip deployment if this published release-index.json matches')
    args = parser.parse_args()
    changed = build_site(args.web, args.output, os.environ.get('GH_TOKEN') or os.environ.get('GITHUB_TOKEN'), args.check_url)
    if os.environ.get('GITHUB_OUTPUT'):
        with open(os.environ['GITHUB_OUTPUT'], 'a', encoding='utf-8') as stream:
            stream.write('changed=' + str(changed).lower() + '\n')


if __name__ == '__main__':
    main()
