#!/bin/sh
#
# pack the various js files into a single, minified one
# then plonk everything relevant into a tarball.
#
set -e
packfile=jquery.hnews-popup.js
minfile=jquery.hnews-popup-min.js
cat microformats.js hcard.js hnews.js hnews-popup.js >$packfile
java -jar ~/bin/yuicompressor-2.4.2.jar $packfile -o $minfile

distfiles="$minfile hnews-popup.css hnews_icon.png hnews_popup_bg.gif"
tar -zcf jquery-hnews-popup.tar.gz $distfiles

