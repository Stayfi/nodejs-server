#!/bin/bash
mkdir -p ./dist/app
cd src/app
cp --parents `find . -name *.njk` ../../dist/app/
