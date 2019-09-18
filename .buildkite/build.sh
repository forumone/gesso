#!/bin/bash

set -exuo pipefail

# Ensure a host verification prompt doesn't prevent the connection.
ssh-keyscan git.drupal.org >> ~/.ssh/known_hosts

# Add the remote for the drupal.org repository mirror.
git config remote.drupal.url 'git@git.drupal.org:project/gesso.git'

# Update our list of remote branches.
git fetch --depth=5 drupal

# Push the latest updates to a branch of the same name.
git push drupal origin/"$BUILDKITE_BRANCH":refs/remotes/drupal/"$BUILDKITE_BRANCH"
