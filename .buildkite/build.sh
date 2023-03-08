#!/bin/bash

set -exuo pipefail

# Ensure a host verification prompt doesn't prevent the connection.
ssh-keyscan git.drupal.org >> ~/.ssh/known_hosts

# Add the remote for the drupal.org repository mirror.
# Add via config to avoid a fatal error from the `git remote add` command
# if the remote already exists.
git config remote.drupal.url 'git@git.drupal.org:project/gesso.git'

# Update our list of remote branches.
git fetch drupal

# Explicitly checkout the branch we're buiding to track a local reference
# we  will push to the remote repository.
git checkout "$BUILDKITE_BRANCH"

# Force a pull on our checked out branch to ensure we're not checked out
# from a stale copy of the repository.
# Ensure only fast-forward merges are allowed to prevent new commits from
# being created.
git pull --ff-only origin "$BUILDKITE_BRANCH"

# Push the latest updates to a branch of the same name.
git push drupal "$BUILDKITE_BRANCH"
