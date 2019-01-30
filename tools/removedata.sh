#!/bin/bash

WORKING_PATH="$( cd "$(dirname "$0")" ; pwd -P )""/data"
echo 'Working path: '$WORKING_PATH;
cd $WORKING_PATH;

echo "Delete Collections..."
for collection in "giphies" "users"; 
do
  echo "Removing $collection...";
#   mongoimport --db giphy-app --collection $collection --authenticationDatabase admin --drop
done

# mongoimport --db giphy-app --collection giphies --authenticationDatabase admin --drop