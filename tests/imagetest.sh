#!/bin/bash

if [ $# -eq 0 ]; then
    echo "Usage: $0 <command> [count]"
    exit 1
fi

command=$1
count=${2:-1}  # Default to 1 if not provided

delete_file() {
    local file_to_delete=$1
    curl -X DELETE "http://0.0.0.0:9191/delete/$file_to_delete"
    echo "Deleted $file_to_delete"
}

export -f delete_file

case $command in
    "upload")
        # Function to perform the upload and cleanup
        perform_upload() {
    local filename=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 10 | head -n 1).png
    convert -size 800x600 xc:gray +noise Random "$filename"
    curl -s -X POST -F "file=@$filename" http://0.0.0.0:9191/upload &
    echo "Started uploading $filename"
    echo "$filename"  # Output filename for tracking

    # Delete the file locally after upload
    sleep .5
    rm "$filename"
}


        # Run uploads in parallel
        for ((i=0; i<count; i++)); do
            perform_upload &
        done
        wait  # Wait for all uploads to finish
        echo "All uploads completed."
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
        delete_file "$filename_to_delete"
        ;;
    "delete_all")
        ls -1 ../services/backend/assets/ | xargs -n 1 -P 4 -I {} bash -c 'delete_file "$@"' _ {}
        ;;
    *)
        echo "Invalid command: $command"
        exit 1
        ;;
esac
