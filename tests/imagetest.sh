#!/bin/bash

if [ $# -eq 0 ]; then
    echo "Usage: $0 <command>"
    exit 1
fi

command=$1
filename=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 10 | head -n 1).png

case $command in
    "upload")
        convert -size 800x600 xc:gray +noise Random "$filename"
        curl -X POST -F "file=@$filename" http://0.0.0.0:9191/upload
        echo "Uploaded $filename"
        ;;
    "get")
        curl -X GET http://0.0.0.0:9191/files
        ;;
    "get_jq")
        curl -X GET http://0.0.0.0:9191/files | jq -r '.files[]'
        ;;
    "delete")
        if [ $# -ne 2 ]; then
            echo "Usage: $0 delete <filename>"
            exit 1
        fi
        filename_to_delete=$2
        curl -X DELETE "http://0.0.0.0:9191/delete/$filename_to_delete"
        ;;
    *)
        echo "Invalid command: $command"
        exit 1
        ;;
esac

rm -f "$filename"
