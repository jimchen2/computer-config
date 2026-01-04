// ==UserScript==
// @name         Website Redirector & Blocker
// @namespace    http://tampermonkey.net/
// @version      1.0
// @license      Unlicense
// @description  Combines Old Reddit redirect, Site Blocking, and Cyrillic Google to Yandex redirection.
// @author       Jim Chen
// @match        *://*.reddit.com/*
// @match        *://*.huaren.us/*
// @match        *://*.tieba.baidu.com/*
// @match        *://*.zombsroyale.io/*
// @match        *://*.generals.io/*
// @match        https://www.google.com/search*
// @match        https://google.com/search*
// @run-at       document-start
// @grant        none
// @updateURL    https://github.com/jimchen2/computer-config/raw/refs/heads/main/userscripts/website-redirector.user.js
// @downloadURL  https://github.com/jimchen2/computer-config/raw/refs/heads/main/userscripts/website-redirector.user.js
// ==/UserScript==

(function () {
    "use strict";

    const hostname = window.location.hostname;
    const href = window.location.href;

    // --- 1. Reddit Logic: Redirect to Old Reddit ---
    if (hostname.includes("reddit.com")) {
        if (hostname !== "old.reddit.com") {
            const newUrl = href.replace(hostname, "old.reddit.com");
            window.location.replace(newUrl);
        }
        return;
    }

    // --- 2. Google Logic: Redirect Cyrillic searches to Yandex ---
    if (hostname.includes("google.com")) {
        const referrer = document.referrer;
        // If navigating from within Google, do not redirect
        if (referrer && referrer.includes('google.com')) {
            return;
        }

        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.get('q');
        
        // Check for Cyrillic characters (Unicode block 0400-04FF)
        if (query && /[\u0400-\u04FF]/.test(query)) {
            window.location.replace(`https://yandex.ru/search/?text=${encodeURIComponent(query)}`);
        }
        return;
    }

    // --- 3. Blocking Logic: Block harmful sites ---
    // List of domains to block (derived from the original @match tags)
    const blockedDomains = [
        "huaren.us",
        "tieba.baidu.com",
        "zombsroyale.io",
        "generals.io"
    ];

    const isBlocked = blockedDomains.some(domain => hostname.includes(domain));

    if (isBlocked) {
        alert(
            "WEBSITE BLOCKED\n\nSite blocked by Userscript because it contains extremist contents.\n\nPlease choose healthy alternatives."
        );
        window.location.replace("https://lmarena.ai/?chat-modality=search");
    }

})();