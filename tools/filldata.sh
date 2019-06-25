#!/bin/bash
# mongoimport --host cluster0-shard-00-00-rdw2g.mongodb.net:27017 --type json --file ~/giphies.json --db giphy-app --collection giphies --authenticationDatabase admin --jsonArray --ssl --username dbadmin --password test

WORKING_PATH="$( cd "$(dirname "$0")" ; pwd -P )"
echo 'Working path: '$WORKING_PATH;
cd $WORKING_PATH;

echo "Recovering json files..."
for file in $WORKING_PATH"/data"/*; do
  filename=$(basename "$file" ".json")
  echo "Importing collection: $filename"
  mongoimport --db giphy-app --collection $filename --authenticationDatabase admin --drop --file $file --jsonArray
done
