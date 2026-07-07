#!/usr/bin/env sh
set -e

printf "
  ____ ___ ____  _____    _    ____  __  __
 / ___|_ _|  _ \| ____|  / \  |  _ \|  \/  |
 \___ \| || | | |  _|   / _ \ | |_) | |\/| |
  ___) | || |_| | |___ / ___ \|  _ <| |  | |
 |____/___|____/|_____/_/   \_\_| \_\_|  |_|

"


bitb_host=https://api.bitbucket.org/2.0
res=$(curl -sX GET -g "${bitb_host}/users/${BITBUCKET_STEP_TRIGGERER_UUID}")
BITBUCKET_TRIGGERER_USERNAME=$(echo "$res" | jq --raw-output '.display_name')
export BITBUCKET_TRIGGERER_USERNAME

node /app/slack-message.js
