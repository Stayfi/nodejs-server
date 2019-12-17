#!/bin/bash
mkdir -p ./dist/app
cd src/app
if [[ "$OSTYPE" == "darwin"* ]]; then
  ditto `find . -name *.njk` ../../dist/app/
else
  cp --parents `find . -name *.njk` ../../dist/app/
fi