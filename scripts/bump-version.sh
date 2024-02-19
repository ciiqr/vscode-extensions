#!/usr/bin/env bash

set -e

quoteSubst() {
    # SOURCE: https://stackoverflow.com/a/29613573
    IFS= read -d '' -r < <(sed -e ':a' -e '$!{N;ba' -e '}' -e 's/[&/\]/\\&/g; s/\n/\\&/g' <<< "$1")
    printf %s "${REPLY%$'\n'}"
}

declare package="$1"
if [[ -z "$package" || "$#" != 1 ]]; then
    echo "usage: bump-version.sh <package>"
    exit 1
fi

declare workspace="$package"
if [[ "$workspace" == 'convert' ]]; then
    workspace='convert-format'
fi

# update package.json
npm version minor --workspace "$workspace"

# get new version
declare version
version="$(
    npm pkg get version --workspace "$workspace" \
        | jq -r 'to_entries[].value'
)"

# update changelog
declare date
date="$(date "+%Y-%m-%d")"
declare changelog="./packages/${package}/CHANGELOG.md"
declare message="- TODO: fill in details for this release"
declare changes
changes="$(quoteSubst $'\n'"## ${version} - ${date}"$'\n'$'\n'"$message")"
sed -i '' "2i\\"$'\n'"${changes}"$'\n' "$changelog"
