#!/bin/sh
git checkout deploy
git pull origin master
git push
git checkout master
