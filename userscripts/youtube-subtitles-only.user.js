// ==UserScript==
// @name         YouTube Russian Subtitles Only
// @namespace    http://tampermonkey.net/
// @version      2.61
// @license      Unlicense
// @description  Display only Russian subtitles on YouTube videos, ignore other languages.
// @author       Jim Chen
// @homepage     https://jimchen.me
// @match        https://*.youtube.com/*
// @run-at       document-idle
// @downloadURL https://update.greasyfork.org/scripts/564636/YouTube%20Russian%20Subtitles%20Only.user.js
// @updateURL https://update.greasyfork.org/scripts/564636/YouTube%20Russian%20Subtitles%20Only.meta.js
// ==/UserScript==
(function () {
  // Inject custom subtitle styling
  const style = document.createElement('style');
  style.textContent = `
    video::cue {
      font-size: 150% !important;
    }
  `;
  document.head.appendChild(style);

  const isMobile = location.href.startsWith("https://m.youtube.com");
  let fired = false;
  let currentVideoID = extractYouTubeVideoID();

  if (location.href.startsWith("https://www.youtube.com")) {
    document.addEventListener("yt-navigate-finish", () => {
      handleVideoNavigation();
    });
    handleVideoNavigation();
  } else if (isMobile) {
    window.addEventListener("popstate", handleVideoNavigation);

    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function () {
      const result = originalPushState.apply(this, arguments);
      handleVideoNavigation();
      return result;
    };

    history.replaceState = function () {
      const result = originalReplaceState.apply(this, arguments);
      handleVideoNavigation();
      return result;
    };

    handleVideoNavigation();
  } else if (location.href.startsWith("https://m.youtube.com")) {
    handleVideoNavigation();
  }

  function extractYouTubeVideoID() {
    const url = window.location.href;
    const patterns = {
      standard: /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?(?:[^?&]+&)*v=([^&]+)/,
      embed: /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^?]+)/,
      mobile: /(?:https?:\/\/)?m\.youtube\.com\/watch\?v=([^&]+)/,
    };

    let videoID = null;
    if (patterns.standard.test(url)) {
      videoID = url.match(patterns.standard)[1];
    } else if (patterns.embed.test(url)) {
      videoID = url.match(patterns.embed)[1];
    } else if (patterns.mobile.test(url)) {
      videoID = url.match(patterns.mobile)[1];
    }
    return videoID;
  }

  async function handleVideoNavigation() {
    console.log("handleVideoNavigation called");
    const newVideoID = extractYouTubeVideoID();
    if (!newVideoID) {
      console.log("[RU SUBS] Not on a video page, returning");
      currentVideoID = null;
      fired = false;
      return;
    }
    if (newVideoID !== currentVideoID) {
      console.log("[RU SUBS] Video ID changed, resetting fired variable");
      currentVideoID = newVideoID;
      fired = false;
    }

    if (fired == true) return;

    fired = true;
    console.log("[RU SUBS] FIRED");
    removeSubs();

    // 1. Check if the video is Russian
    const languageCheckPassed = await checkLanguageCode();
    if (!languageCheckPassed) return;

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    let subtitleURL = null;

    for (let attempt = 0; attempt < 3 && subtitleURL == null; attempt++) {
      if (attempt > 0) {
        await sleep(5000);
      }

      try {
        subtitleURL = await extractSubtitleUrl();
      } catch (error) {
        console.log(`Attempt ${attempt + 1} failed:`, error);
      }
    }

    if (subtitleURL == null) return;

    const url = new URL(subtitleURL);
    if (!url.searchParams.has("kind")) url.searchParams.set("kind", "asr");
    if (url.searchParams.has("fmt")) {
      url.searchParams.set("fmt", "vtt");
    } else {
      url.searchParams.set("fmt", "vtt");
    }
    url.searchParams.delete("tlang");

    console.log(`[RU SUBS] subtitleURL ${url.toString()}`);
    await addOneSubtitle(url.toString());

    console.log("[RU SUBS] AAA");
    const subtitleButtonSelector = isMobile ? ".ytmClosedCaptioningButtonButton" : ".ytp-subtitles-button";
    const subtitleButton = document.querySelector(subtitleButtonSelector);
    console.log("[RU SUBS] BBB");

    // Turn off YouTube's default subtitles (so we don't have duplicates)
    if (subtitleButton && subtitleButton.getAttribute("aria-pressed") === "true") {
      console.log("[RU SUBS] YouTube's subtitle is switched on, switching it off...");
      subtitleButton.click();
    }

    setTimeout(() => ensureVideoPlaying(), 500);
    function ensureVideoPlaying() {
      const video = document.querySelector("video");
      if (video && video.paused) {
        console.log("[RU SUBS] Video was paused, attempting to play...");
        video.play();
      }
    }

    console.log("[RU SUBS] CCC");
  }

  function checkLanguageCode() {
    return new Promise((resolve) => {
      let attempts = 0;
      const maxAttempts = 5;

      const intervalId = setInterval(() => {
        attempts++;
        console.log(`[RU SUBS] Language check attempt ${attempts}/${maxAttempts}`);

        try {
          const languageCode = document.querySelector("#movie_player").getPlayerResponse().captions
            .playerCaptionsTracklistRenderer.captionTracks[0].languageCode;

          if (languageCode) {
            // --- MODIFICATION: Only check for Russian ('ru') ---
            if (languageCode.includes("ru")) {
              console.log("[RU SUBS] Language check passed:", languageCode);
              clearInterval(intervalId);
              resolve(true);
              return;
            } else {
              console.log("[RU SUBS] Language code does not contain 'ru':", languageCode);
              clearInterval(intervalId);
              resolve(false);
              return;
            }
          }
        } catch (error) {
          console.log("[RU SUBS] Language check failed with error:", error);
        }

        if (attempts >= maxAttempts) {
          console.log("[RU SUBS] Language check failed after all attempts. Skipping.");
          clearInterval(intervalId);
          resolve(false);
        }
      }, 1000);
    });
  }

  async function extractSubtitleUrl() {
    const isMobile = location.href.startsWith("https://m.youtube.com");
    const subtitleButtonSelector = isMobile ? ".ytmClosedCaptioningButtonButton" : ".ytp-subtitles-button";

    if (isMobile) {
      document.querySelector("#movie_player").click();
      document.querySelector("#movie_player").click();
    }

    async function findSubtitleButtonWithRetry(subtitleButtonSelector, maxAttempts = 3, delayMs = 1000) {
      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        const subtitleButton = document.querySelector(subtitleButtonSelector);
        if (subtitleButton) return subtitleButton;
        if (attempt < maxAttempts) {
          await new Promise((resolve) => setTimeout(resolve, delayMs));
        }
      }
      return null;
    }

    const subtitleButton = await findSubtitleButtonWithRetry(subtitleButtonSelector);
    if (!subtitleButton) return;

    const initialEntryCount = performance.getEntriesByType("resource").length;

    // Toggle button twice to trigger timedtext request
    subtitleButton.click();
    subtitleButton.click();

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newEntries = performance.getEntriesByType("resource").slice(initialEntryCount);
    console.log(`[RU SUBS] New entries detected: ${newEntries.length}`);
    let timedtextUrl = null;

    for (const entry of newEntries) {
      const isTimedtext = entry.name.includes("timedtext");
      const hasPot = entry.name.includes("&pot=");

      if (isTimedtext && hasPot) {
        console.log("[RU SUBS] ✅ Found matching timedtext request with &pot= parameter!");
        timedtextUrl = entry.name;
        break;
      }
    }

    if (!timedtextUrl) {
      console.log("[RU SUBS] ❌ No timedtext requests with &pot= parameter found");
    }

    return timedtextUrl;
  }

  async function addOneSubtitle(url, maxRetries = 5, delay = 1000) {
    const video = document.querySelector("video");
    try {
      const response = await fetch(url);
      let subtitleData = (await response.text()).replaceAll("align:start position:0%", "");

      // Modify VTT data to position subtitles higher (85% down from top, about 2 lines up from bottom)
      subtitleData = subtitleData.replace(
        /(\d{2}:\d{2}:\d{2}\.\d{3}\s+-->\s+\d{2}:\d{2}:\d{2}\.\d{3})/g,
        '$1 line:80%'
      );

      const track = document.createElement("track");
      track.src = "data:text/vtt," + encodeURIComponent(subtitleData);
      await new Promise((resolve) => setTimeout(resolve, delay));
      video.appendChild(track);
      track.track.mode = "showing";
    } catch (error) {
      if (maxRetries > 0) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        return addOneSubtitle(url, maxRetries - 1, delay * maxRetries);
      }
    }
  }

  function removeSubs() {
    console.log(`[RU SUBS] Removing Subtitles.`);
    const video = document.getElementsByTagName("video")[0];
    if (!video) return;
    const tracks = video.getElementsByTagName("track");
    console.log(`[RU SUBS] Removing tracks ${tracks}.`);
    Array.from(tracks).forEach(function (ele) {
      ele.track.mode = "hidden";
      ele.parentNode.removeChild(ele);
    });
  }
})();