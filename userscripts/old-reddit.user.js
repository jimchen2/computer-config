// ==UserScript==
// @name         Reddit to Old Reddit Redirector
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Automatically redirects Reddit pages to old.reddit.com
// @author       Jim Chen
// @match        *://*.reddit.com/*
// @exclude      *://old.reddit.com/*
// @exclude      *://www.reddit.com/media*
// @run-at       document-start
// @updateURL    https://github.com/jimchen2/computer-config/raw/refs/heads/main/userscripts/old-reddit.user.js
// @downloadURL  https://github.com/jimchen2/computer-config/raw/refs/heads/main/userscripts/old-reddit.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // Don't redirect if it's a media URL
    if (window.location.pathname.startsWith('/media')) {
        return;
    }

    // Redirect to old.reddit.com if not already there
    if (window.location.hostname.indexOf('old.reddit.com') === -1) {
        window.location.replace(window.location.href.replace(/\/\/(www\.)?reddit\.com/, '//old.reddit.com'));
    }
})();
