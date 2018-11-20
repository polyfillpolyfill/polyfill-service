#!/bin/sh
{
    set -e
    SUDO=''
    if [ "$(id -u)" != "0" ]; then
      SUDO='sudo'
      echo "This script requires superuser access to install apt packages."
      echo "You will be prompted for your password by sudo."
      # clear any previous sudo permission
      sudo -k
    fi

    # run inside sudo
    $SUDO sh <<SCRIPT
  set -ex

  # if apt-transport-https is not installed, clear out old sources, update, then install apt-transport-https
  dpkg -s apt-transport-https 1>/dev/null 2>/dev/null || \
    (echo "" > /etc/apt/sources.list.d/heroku.list \
      && apt-get update \
      && apt-get install -y apt-transport-https)

  # add heroku repository to apt
  echo "deb https://cli-assets.heroku.com/apt ./" > /etc/apt/sources.list.d/heroku.list

  # remove toolbelt
  (dpkg -s heroku-toolbelt 1>/dev/null 2>/dev/null && (apt-get remove -y heroku-toolbelt heroku || true)) || true

  # install heroku's release key for package verification
  curl https://cli-assets.heroku.com/apt/release.key | apt-key add -

  # update your sources
  apt-get update

  # install the toolbelt
  apt-get install -y heroku

SCRIPT
  # test the CLI
  LOCATION=$(which heroku)
  echo "heroku installed to $LOCATION"
  heroku version
}