#!/bin/bash

set -exuo pipefail

# Ensure a host verification prompt doesn't prevent the connection.
ssh-keyscan git.drupal.org >> ~/.ssh/known_hosts

# Assign the expected committer details.
git config user.name "$GIT_USER"
git config user.email "$GIT_EMAIL"

# Add the remote for the drupal.org repository mirror.
git config remote.drupal.url 'git@git.drupal.org:project/gesso.git'

# Update our list of remote branches.
git fetch --depth=5 drupal

# Push the latest updates to a branch of the same name.
# Temporary: Add the dry-run flag to prevent actually pushing changes.
git push --dry-run drupal origin/"$BUILDKITE_BRANCH":refs/remotes/drupal/"$BUILDKITE_BRANCH"
