#!/bin/sh

# Clean output directory, excluding customised files
keep="lib/mailosaur.js"

for f in lib/*
do
  if [[ ! " ${keep[@]} " =~ " ${f} " ]]; then
    rm -rf "$f"
  fi
done

# Rebuild generated code
autorest

# Amend error handling
for f in `find lib -type f -name "*.js"`
do
  sed -i "" "s/new\ Error(responseBody)/new Error('Operation returned an invalid status code \\\'' + statusCode + '\\\'')/g" "$f"
  sed -i "" s/error\.body/error.mailosaurError/g "$f"
  sed -i "" "/error\.message\ = \internalError/d" "$f"
done

# Update dependencies
npm install