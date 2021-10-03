const domain = document.querySelector("select#domain");
const sidebar = document.querySelector("select#sidebar");

const notice = document.querySelector("figure.update-notice");

const save = () => {
  chrome.storage.sync.set({
    domain: domain.value,
    hide: sidebar.value === "false"
  });

  notice.classList.remove("update-notice--hidden");
  window.setTimeout(() => notice.classList.add("update-notice--hidden"), 5000);
}

const load = () => {
  chrome.storage.sync.get({
    domain: "https://sci-hub.se/",
    hide: true
  }, (data) => {
    domain.value = data.domain;
    sidebar.value = data.hide ? "false" : "true";
  });
}

document.addEventListener("DOMContentLoaded", load);
domain.addEventListener("change", save);
sidebar.addEventListener("change", save);

