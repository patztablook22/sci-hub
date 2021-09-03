const domain = document.querySelector("select#domain");
const hide   = document.querySelector("input#hide");

const save = () => {
  chrome.storage.sync.set({
    domain: domain.value,
    hide: hide.checked
  });
}

const load = () => {
  chrome.storage.sync.get({
    domain: "https://sci-hub.se/",
    hide: true
  }, (data) => {
    domain.value = data.domain;
    hide.checked = data.hide;
  });
}

document.addEventListener("DOMContentLoaded", load);
domain.addEventListener("change", save);
hide.addEventListener("change", save);

