#! /bin/zsh

find . -name '*.js' | awk -F '.' '{print $2}' | awk -F '/' '{print $2}'| while read i
do
    echo $i
    mv ./$i.js ../$i.js
done