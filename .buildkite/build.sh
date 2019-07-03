#!/bin/bash

set -exuo pipefail

ssh-keyscan git.drupal.org >> ~/.ssh/known_hosts

git config --set user.name "$GIT_USER"
git config --set user.email "$GIT_EMAIL"

git config --set remote.drupal.url git@git.drupal.org:project/gesso.git

git fetch drupal "$BUILDKITE_BRANCH"

git push drupal HEAD:"$BUILDKITE_BRANCH"