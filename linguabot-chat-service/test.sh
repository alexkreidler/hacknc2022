#!/bin/bash
# set -euxo
id=$(http POST http://127.0.0.1:8000/chats | jq -r '.id')

http POST "http://127.0.0.1:8000/chats/$id/message?message=Soy Mari y vivo en Nueva York- Como te llamas?"