#!/bin/bash

WORKING_PATH="$( cd "$(dirname "$0")" ; pwd -P )"
echo 'Working path: '$WORKING_PATH;
cd $WORKING_PATH;

mongoexport --db giphy-app --collection giphies --out $WORKING_PATH"/data/giphies.json" --jsonArray
mongoexport --db giphy-app --collection users --out $WORKING_PATH"/data/users.json" --jsonArray
