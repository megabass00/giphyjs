#!/bin/bash

WORKING_PATH="$( cd "$(dirname "$0")" ; pwd -P )"
echo 'Working path: '$WORKING_PATH;
cd $WORKING_PATH;

echo "Recovering json files..."
for file in $WORKING_PATH"/data"/*; do
  echo "Importing $file..."
  mongoimport --db giphy-app --collection giphies --authenticationDatabase admin --drop --file $file --jsonArray
done
