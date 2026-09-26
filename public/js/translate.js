// ================= AUTO DETECT LANGUAGE =================

(function () {

  if (!localStorage.getItem("lang")) {

    const userLang = navigator.language || navigator.userLanguage || "en";

    if (userLang.toLowerCase().startsWith("te")) {
      localStorage.setItem("lang", "te");
    }
    else if (userLang.toLowerCase().startsWith("hi")) {
      localStorage.setItem("lang", "hi");
    }
    else {
      localStorage.setItem("lang", "en");
    }
  }

})();


// ================= INIT GOOGLE TRANSLATE =================

function googleTranslateElementInit() {

  new google.translate.TranslateElement(
    {
      pageLanguage: "en",
      includedLanguages: "en,te,hi",
      autoDisplay: false,
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    },
    "google_translate_element"
  );

  waitForGoogleTranslate();
}


// ================= WAIT FOR GOOGLE TRANSLATE =================

function waitForGoogleTranslate() {

  let attempts = 0;

  const interval = setInterval(function () {

    const combo = document.querySelector(".goog-te-combo");

    if (combo) {

      clearInterval(interval);

      applySavedLanguage(combo);
    }

    attempts++;

    // Stop after about 15 seconds
    if (attempts > 50) {
      clearInterval(interval);
    }

  }, 300);
}


// ================= APPLY SAVED LANGUAGE =================

function applySavedLanguage(combo) {

  const savedLang = localStorage.getItem("lang");

  if (!savedLang || savedLang === "en") {
    return;
  }

  combo.value = savedLang;

  combo.dispatchEvent(new Event("change", {
    bubbles: true
  }));
}


// ================= SAVE LANGUAGE =================

document.addEventListener("change", function (event) {

  const target = event.target;

  if (
    target &&
    target.classList &&
    target.classList.contains("goog-te-combo")
  ) {

    const selectedLang = target.value;

    if (selectedLang) {
      localStorage.setItem("lang", selectedLang);
    }
  }

});