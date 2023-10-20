#!/usr/bin/env bash

set -euo pipefail
set -x

for file in 3.101.0 3.103.0 3.104.0 3.108.0 3.109.0 3.110.1 3.111.0 3.25.1 3.27.4 3.34.0 3.39.0 3.40.0 3.41.0 3.42.0 3.46.0 3.48.0 3.50.2 3.51.0 3.52.0 3.52.1 3.52.2 3.52.3 3.53.1 3.89.4 3.96.0 3.98.0 ; do
    c-at-e-file-server local --toml fastly.toml --name "polyfill-library-$file" -- "./polyfill-libraries/polyfill-library-$file/polyfills/__dist/"
done

# for file in 3.101.0 3.103.0 3.104.0 3.108.0 3.109.0 3.110.1 3.111.0 3.25.1 3.27.4 3.34.0 3.39.0 3.40.0 3.41.0 3.42.0 3.46.0 3.48.0 3.50.2 3.51.0 3.52.0 3.52.1 3.52.2 3.52.3 3.53.1 3.89.4 3.96.0 3.98.0 ; do
#     c-at-e-file-server upload --name "polyfill-library-$file" --token "$(fastly profile token --quiet polyfill)"  -- "./polyfill-libraries/polyfill-library-$file/polyfills/__dist/"
# done
