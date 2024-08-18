const nav_lang = navigator.language.split('-')[0];

function translateContent(translations) {
  document.querySelectorAll('[i18n]').forEach(el => {
    const key = el.getAttribute('i18n');
    el.textContent = translations[key] || el.textContent;
  });
}

function setLanguage(lang) {
  fetch(`../locales/${lang}.json`)
    .then(response => response.json())
    .then(translations => {
      translateContent(translations);
      updateCuteMeter(translations);
      updateFooter(translations);
    })
    .catch(err => console.error(`Error loading language file: ${err}`));
}

function updateCuteMeter(translations) {
  const cuteValue = Math.floor(Math.random() * 101);
  let cuteValueText = "";
  let cuteResults = "";

  if (cuteValue < 30) {
    cuteValueText = translations['cute_low'].replace('{value}', cuteValue);
    cuteResults = translations['results_low'];
  } else if (cuteValue >= 30 && cuteValue < 60) {
    cuteValueText = translations['cute_mid'].replace('{value}', cuteValue);
    cuteResults = translations['results_mid'];
  } else if (cuteValue >= 60 && cuteValue < 80) {
    cuteValueText = translations['cute_high'].replace('{value}', cuteValue);
    cuteResults = translations['results_high'];
  } else {
    cuteValueText = translations['cute_max'].replace('{value}', cuteValue);
    cuteResults = translations['results_max'];
  }

  document.getElementById("cute-meter").setAttribute("value", cuteValue);
  document.getElementById("cute-value").textContent = cuteValueText;
  document.getElementById("results").textContent = cuteResults;

  document.addEventListener("click", function () {
    location.reload();
  });
}

const usernames = {
  luki: 'lucmsilva651',
  giv: 'GiovaniFZ'
};

function updateFooter(translations) {
  document.getElementById('footer').innerHTML = translations['footer']
    .replace('{luki}', `<a href="https://github.com/${usernames.luki}">@${usernames.luki}</a>`)
    .replace('{giv}', `<a href="https://github.com/${usernames.giv}">@${usernames.giv}</a>`);
}

document.addEventListener("DOMContentLoaded", function () {
  setLanguage(nav_lang || "en");
});
