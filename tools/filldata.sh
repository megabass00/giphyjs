#!/bin/bash

WORKING_PATH="$( cd "$(dirname "$0")" ; pwd -P )"
echo 'Working path: '$WORKING_PATH;
cd $WORKING_PATH;

echo "Recovering json files..."
for file in $WORKING_PATH"/data"/*; do
  filename=$(basename "$file" ".json")
  echo "Importing collection: $filename"
  mongoimport --db giphy-app --collection $filename --authenticationDatabase admin --drop --file $file --jsonArray
done
