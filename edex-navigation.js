
/*
  EDEX NAVIGATION
  Connects all three existing websites.

  This file changes links only.
  It does not edit Firebase data.
*/

(function () {
  "use strict";

  const URLS = {
    mainAdmin:
      "https://freshlook10-alt.github.io/arabic-choclate-quiz/admin.html",

    quizScreen:
      "https://freshlook10-alt.github.io/arabic-choclate-quiz/",

    ballAdmin:
      "https://freshlook10-alt.github.io/Edex-Word-Portal/admin.html",

    ballScreen:
      "https://freshlook10-alt.github.io/Edex-Word-Portal/",

    timerAdmin:
      "https://freshlook10-alt.github.io/edex-timer-challenge/admin.html",

    timerScreen:
      "https://freshlook10-alt.github.io/edex-timer-challenge/"
  };

  const path =
    window.location.pathname.toLowerCase();

  const game =
    path.includes("/arabic-choclate-quiz/")
      ? "quiz"
      : path.includes("/edex-word-portal/")
        ? "ball"
        : path.includes("/edex-timer-challenge/")
          ? "timer"
          : null;

  if (!game) {
    return;
  }

  const isAdmin =
    path.endsWith("/admin.html");

  // CORRECT ANY OLD, WRONG ADMIN LINKS.

  document.querySelectorAll("a").forEach(link => {

    const label =
      link.textContent.trim().toLowerCase();

    if (
      label.includes("ball") &&
      label.includes("admin")
    ) {
      link.href = URLS.ballAdmin;
    }

    if (
      label.includes("timer") &&
      label.includes("admin")
    ) {
      link.href = URLS.timerAdmin;
    }

    if (
      label.includes("quiz") &&
      label.includes("admin")
    ) {
      link.href = URLS.mainAdmin;
    }

  });

  // KEEP THE EXISTING QUIZ ADMIN BUTTONS.
  // ADD TIMER IF IT WAS MISSING.

  if (game === "quiz" && isAdmin) {

    const tabs =
      document.querySelector(".admin-tabs") ||
      document.querySelector("header.head nav");

    if (tabs) {

      const links =
        Array.from(tabs.querySelectorAll("a"));

      const hasTimer = links.some(link =>
        link.textContent
          .toLowerCase()
          .includes("timer")
      );

      if (!hasTimer) {

        const timerLink =
          document.createElement("a");

        timerLink.href = URLS.timerAdmin;
        timerLink.textContent =
          "⏱ Timer Admin";

        tabs.appendChild(timerLink);
      }
    }
  }

  // STYLES FOR THE EXTRA NAVIGATION BAR.

  const style = document.createElement("style");

  style.textContent = `
    #edex-navigation {
      position: relative;
      z-index: 9999;

      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;

      gap: 10px;
      padding: 13px 16px;

      background: #17132b;
      border-bottom: 1px solid #80639e;

      font-family: Arial, sans-serif;
    }

    #edex-navigation a {
      display: inline-flex;
      align-items: center;
      justify-content: center;

      min-height: 42px;
      padding: 10px 15px;

      border: 1px solid #786091;
      border-radius: 11px;

      background: #45345d;
      color: #f9efff;

      font-size: 12px;
      font-weight: 800;
      text-align: center;
      text-decoration: none;

      box-sizing: border-box;
    }

    #edex-navigation a:hover {
      background: #675081;
    }

    #edex-navigation a.edex-gold {
      background: #f6d593;
      border-color: #f6d593;
      color: #281b13;
    }

    @media (max-width: 600px) {
      #edex-navigation a {
        flex: 1;
        font-size: 11px;
      }
    }
  `;

  document.head.appendChild(style);

  // CREATE THE NAVIGATION BUTTONS.

  const bar = document.createElement("nav");

  bar.id = "edex-navigation";
  bar.setAttribute(
    "aria-label",
    "EDEX game navigation"
  );

  function addButton(
    title,
    destination,
    newTab = false,
    gold = false
  ) {

    const button =
      document.createElement("a");

    button.textContent = title;
    button.href = destination;

    if (newTab) {
      button.target = "_blank";
      button.rel = "noopener noreferrer";
    }

    if (gold) {
      button.className = "edex-gold";
    }

    bar.appendChild(button);
  }

  // QUIZ ADMIN

  if (game === "quiz" && isAdmin) {

    addButton(
      "↗ Open Quiz Visitor Screen",
      URLS.quizScreen,
      true,
      true
    );

  }

  // BALL ADMIN

  if (game === "ball" && isAdmin) {

    addButton(
      "← Main EDEX Admin",
      URLS.mainAdmin
    );

    addButton(
      "↗ Open Ball Visitor / Organizer",
      URLS.ballScreen,
      true,
      true
    );

  }

  // TIMER ADMIN

  if (game === "timer" && isAdmin) {

    addButton(
      "← Main EDEX Admin",
      URLS.mainAdmin
    );

    addButton(
      "◈ Ball Game Admin",
      URLS.ballAdmin
    );

    addButton(
      "↗ Open Timer Visitor / Organizer",
      URLS.timerScreen,
      true,
      true
    );

  }

  // BALL VISITOR / ORGANIZER SCREEN

  if (game === "ball" && !isAdmin) {

    addButton(
      "← Main EDEX Admin",
      URLS.mainAdmin
    );

    addButton(
      "⚙ Ball Game Admin",
      URLS.ballAdmin
    );

  }

  // TIMER VISITOR / ORGANIZER SCREEN

  if (game === "timer" && !isAdmin) {

    addButton(
      "← Main EDEX Admin",
      URLS.mainAdmin
    );

    addButton(
      "⚙ Timer Admin",
      URLS.timerAdmin
    );

  }

  // ONLY ADD THE BAR WHEN THERE ARE BUTTONS.

  if (bar.children.length > 0) {
    document.body.insertAdjacentElement(
      "afterbegin",
      bar
    );
  }

})();
