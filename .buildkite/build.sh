#!/bin/bash

set -exuo pipefail

ssh-keyscan git.drupal.org >> ~/.ssh/known_hosts

git config user.name "$GIT_USER"
git config user.email "$GIT_EMAIL"

git config remote.drupal.url git@git.drupal.org:project/gesso.git

git push drupal HEAD:"$BUILDKITE_BRANCH"