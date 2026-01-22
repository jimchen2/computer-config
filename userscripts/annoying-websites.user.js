// ==UserScript==
// @name         Annoying Websites
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Annoy the Annoying Websites.
// @author       Jim Chen
// @match        *://*.reddit.com/*
// @match        *://*.huaren.us/*
// @match        *://*.tieba.baidu.com/*
// @match        *://*.bilibili.com/*
// @match        *://*.zombsroyale.io/*
// @grant        window.close
// @run-at       document-end
// @updateURL    https://github.com/jimchen2/computer-config/raw/refs/heads/main/userscripts/annoying-websites.user.js
// @downloadURL  https://github.com/jimchen2/computer-config/raw/refs/heads/main/userscripts/annoying-websites.user.js
// ==/UserScript==

(function() {
    'use strict';

    // ================= CONFIGURATION =================
    const INTERVAL_MINUTES = 1.5;
    const WAIT_SECONDS = 30;
    
    // Set this to true to see time remaining in the debug console (F12)
    const SHOW_TIMER_IN_CONSOLE = true; 
    // =================================================

    // State
    let mainTimerInterval = null;

    // Create the UI elements
    function createOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'prod-overlay';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100vw';
        overlay.style.height = '100vh';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
        overlay.style.zIndex = '999999';
        overlay.style.display = 'flex';
        overlay.style.flexDirection = 'column';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';
        overlay.style.color = 'white';
        overlay.style.fontFamily = 'Arial, sans-serif';
        overlay.style.textAlign = 'center';
        
        // Prevent scrolling on the body while active
        document.body.style.overflow = 'hidden';

        const message = document.createElement('h1');
        message.innerText = "Hey, You Are Not Supposed to Do That!!! :( :( :( Do You Really Want to Continue?";
        message.style.marginBottom = '20px';
        message.style.fontSize = '22px'; 
        message.style.padding = '0 20px';
        message.style.lineHeight = '1.4';

        const timerDisplay = document.createElement('div');
        timerDisplay.id = 'prod-timer';
        timerDisplay.style.fontSize = '48px';
        timerDisplay.style.fontWeight = 'bold';
        timerDisplay.innerText = WAIT_SECONDS;

        const buttonContainer = document.createElement('div');
        buttonContainer.id = 'prod-buttons';
        buttonContainer.style.marginTop = '30px';
        buttonContainer.style.display = 'none'; // Hidden initially
        
        buttonContainer.style.flexDirection = 'column'; // Stack vertically
        buttonContainer.style.gap = '15px'; 
        buttonContainer.style.width = '80%'; // Take up 80% of screen width
        buttonContainer.style.maxWidth = '300px'; // But don't get bigger than 300px

        const btnContinue = document.createElement('button');
        btnContinue.innerText = "Continue Browsing";
        styleButton(btnContinue, '#4CAF50');
        btnContinue.onclick = () => {
            document.body.removeChild(overlay);
            document.body.style.overflow = 'auto'; // Restore scroll
            startMainTimer();
        };

        const btnClose = document.createElement('button');
        btnClose.innerText = "Close Tab";
        styleButton(btnClose, '#f44336');
        btnClose.onclick = () => {
            window.close(); 
            window.location.href = "about:blank";
        };

        buttonContainer.appendChild(btnClose);
        buttonContainer.appendChild(btnContinue);

        overlay.appendChild(message);
        overlay.appendChild(timerDisplay);
        overlay.appendChild(buttonContainer);

        document.body.appendChild(overlay);

        // Start the 30-second countdown
        let secondsLeft = WAIT_SECONDS;
        const countdown = setInterval(() => {
            secondsLeft--;
            timerDisplay.innerText = secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(countdown);
                timerDisplay.innerText = "Time's up.";
                buttonContainer.style.display = 'flex'; 
            }
        }, 1000);
    }

    function styleButton(btn, color) {
        btn.style.padding = '12px 20px';
        btn.style.fontSize = '16px';     
        btn.style.fontWeight = 'bold';
        btn.style.cursor = 'pointer';
        btn.style.backgroundColor = color;
        btn.style.color = 'white';
        btn.style.border = 'none';
        btn.style.borderRadius = '8px';
        btn.style.width = '100%';
    }

    function startMainTimer() {
        let timeRemaining = INTERVAL_MINUTES * 60;
        
        console.log(`Timer started. Next break in ${INTERVAL_MINUTES} minutes.`);

        if (mainTimerInterval) clearInterval(mainTimerInterval);

        mainTimerInterval = setInterval(() => {
            timeRemaining--;

            if (SHOW_TIMER_IN_CONSOLE) {
                console.log(`[Annoy] Time remaining: ${timeRemaining}s`);
            }

            if (timeRemaining <= 0) {
                clearInterval(mainTimerInterval);
                createOverlay();
            }
        }, 1000);
    }

    // Initialize
    const existing = document.getElementById('prod-overlay');
    if (existing) existing.remove();
    
    createOverlay();

})();
