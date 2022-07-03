// ==UserScript==
// @name        Allow full screen on embedded Youtube
// @namespace   KevinSJ_Github
// @match       *://*/*
// @grant       none
// @version     6
// @author      KevinSJ
// @description ViolentMonkey script
// ==/UserScript==

// This script is based on https://github.com/mwisnicki/userscripts/blob/master/allowfullscreen-youtube-embed.user.js

// Add your own urls
const URLs = ['youtube.com', 'youtube-nocookie.com'];

const SELECTORS = URLs.map((url) => `iframe[src*="${url}"]`).join(',');

/**
 * @param {HTMLIFrameElement} iframe
 */
function reloadIframe(iframe) {
  iframe.src = iframe.src;
}

function fixVideos() {
  const iframes = document.querySelectorAll(`${SELECTORS}`);
  for (const iframe of iframes) {
    iframe.setAttribute('allowfullscreen', '');
    reloadIframe(iframe);
    console.log('Forced Youtube allowfullscreen on %o', iframe);
  }
}

fixVideos();

new MutationObserver(fixVideos).observe(document, {
  childList: true,
  subtree: true,
});
