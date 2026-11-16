
/*
 EDEX — FIVE GAME ADMIN NAVIGATION

 Automatically adds Hit the Box
 as the fifth Admin tab.

 Correct filenames:
 hitbox.html
 hitbox-admin.html
 hitbox.js
*/

(() => {
  "use strict";

  const HITBOX_URL =
    "https://freshlook10-alt.github.io/Edex-Word-Portal/hitbox-admin.html";

  function addHitBoxTab() {

    const nav = document.querySelector(
      "nav.edex-tabs, nav.tabs"
    );

    if (!nav) return;

    // Check if Hit the Box is already there.

    const existing = Array.from(
      nav.querySelectorAll("a")
    ).find(link =>
      link.href.includes("hitbox-admin.html")
    );

    // Add the fifth tab only once.

    if (!existing) {

      const link = document.createElement("a");

      link.href = HITBOX_URL;

      link.textContent = "🎯 Hit the Box";

      nav.appendChild(link);
    }

    // Highlight the current game.

    nav.querySelectorAll("a").forEach(link => {

      if (
        link.href.includes("hitbox-admin.html") &&
        window.location.pathname.includes(
          "hitbox-admin.html"
        )
      ) {
        link.classList.add("active");
        link.setAttribute(
          "aria-current",
          "page"
        );
      }
    });

    // Fit all five tabs neatly.

    if (!document.getElementById(
      "edex-five-tab-style"
    )) {

      const style = document.createElement("style");

      style.id = "edex-five-tab-style";

      style.textContent = `
        @media (min-width: 951px) {

          nav.edex-tabs,
          nav.tabs {
            display: grid !important;
            grid-template-columns:
              repeat(5, minmax(0, 1fr)) !important;
            gap: 9px !important;
          }

          nav.edex-tabs a,
          nav.tabs a {
            min-width: 0;
            overflow-wrap: anywhere;
            text-align: center;
          }
        }

        @media (max-width: 950px) {

          nav.edex-tabs,
          nav.tabs {
            display: grid !important;
            grid-template-columns:
              repeat(2, minmax(0, 1fr)) !important;
            gap: 8px !important;
          }
        }
      `;

      document.head.appendChild(style);
    }
  }

  if (document.readyState === "loading") {

    document.addEventListener(
      "DOMContentLoaded",
      addHitBoxTab
    );

  } else {

    addHitBoxTab();
  }

})();
