#!/bin/bash

cd ./minified

echo 'Clearing minified directory.'

rm -rf *

cd ../source

for file in ./*.js
do
	echo 'Compressing '$file'.'
	uglifyjs $file -o ../minified/$file
done

echo 'Done!'