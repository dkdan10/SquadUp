#!/usr/bin/env bash
set -euo pipefail

bundle install
npm install
npm run build
bundle exec rails assets:precompile
bundle exec rails db:prepare
