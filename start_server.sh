#!/usr/bin/env bash

if [ ! "$WEB_MEMORY" = "" ]; then
	if [ $WEB_MEMORY -le 512 ]; then
		NODE_FLAGS="--gc_interval=100 --optimize_for_size --max_semi_space_size=2 --max_old_space_size=256"
	elif [ $WEB_MEMORY -le 768 ]; then
		NODE_FLAGS="--gc_interval=100 --optimize_for_size --max_semi_space_size=8 --max_old_space_size=512"
	elif [ $WEB_MEMORY -le 1024 ]; then
		NODE_FLAGS="--gc_interval=100 --optimize_for_size --max_semi_space_size=16 --max_old_space_size=1024"
	fi
fi

node $NODE_FLAGS "$@"
