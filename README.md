# Claw2 builds

Play the web build at https://captainclawnet.github.io/Claw2/.

This repository contains built executables, not the game source or editable assets.
GitHub Releases in captainclawnet/BaseAssets and the language repositories are the
single source of truth for assets. The Pages workflow downloads the latest stable
releases, verifies every SHA-256 hash, and creates a disposable deployment cache.
Assets are never checked into this repository.

The site refreshes on build pushes, asset-published dispatch events, manual workflow
runs, and an hourly fallback check. Unchanged releases do not trigger redeployment.
GitHub may delay scheduled workflows. Publish corrections under a new release version.

To deploy a new executable, run tools/PublishWeb.py from the game source checkout.
To refresh assets immediately, run the Pages workflow from the Actions tab.
