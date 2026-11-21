/* KULZZY RADIO — RADIO AUDIO / LIVE STREAM CONNECTOR */

(function () {
  "use strict";

  const PLAYER_ID = "kulzzy-radio-audio-live";
  const PLAYER_NAME = "Kulzzy Radio Audio / LIVE Stream";

  const CONTROLLER_URL =
    "https://raw.githubusercontent.com/kulzzy/KULZZY-UNIVERSAL-MEDIA-CONTROL/main/controller.js";

  let controllerLoading = false;

  window.KULZZY_MEDIA_PLAYER_CONFIG = {
    playerId: PLAYER_ID,
    playerName: PLAYER_NAME,

    stop: function (detail) {
      if (typeof window.KULZZY_STOP_PLAYER === "function") {
        window.KULZZY_STOP_PLAYER(detail);
        return;
      }

      document.querySelectorAll("audio, video").forEach(function (media) {
        media.pause();
      });
    }
  };

  function connectPlayer() {
    if (controllerLoading) return;
    if (window.KULZZY_UNIVERSAL_MEDIA_CONTROL) return;

    controllerLoading = true;

    const script = document.createElement("script");
    script.src = CONTROLLER_URL;
    script.async = true;

    script.onload = function () {
      console.log(
        "[Kulzzy Radio] Universal Media Controller connected:",
        PLAYER_NAME
      );
    };

    script.onerror = function () {
      controllerLoading = false;
      console.error(
        "[Kulzzy Radio] Could not connect to the Universal Media Controller."
      );
    };

    document.head.appendChild(script);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", connectPlayer, {
      once: true
    });
  } else {
    connectPlayer();
  }
})();
