#!/bin/bash

#set -xv

IMAGE_PATH="../images"

function generateTile() {
	echo "$1 - $2"
}

function parseDirectoryForTiles() {
	cd $1
	for image in *png; do
		generateTile "$1/$image" $2
	done
	cd -
}

function parseDirectoryForFolders() {
	cd $1
	for file in *; do
		if [ -d $file ]; then
			parseDirectoryForTiles $file $file
		fi
	done
	cd -
}

NBARGS=1

if [ $# -eq $NBARGS ]
then
	IMAGE_PATH="$1"
fi

parseDirectoryForTiles $IMAGE_PATH
parseDirectoryForFolders $IMAGE_PATH