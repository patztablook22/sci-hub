const extractUrlFromLinkEvent = element => {
  // get its url
  const target = element.tagName.toUpperCase() == "A"
    ? element
    : element.parentElement;

  return target.getAttribute("href");
}

const withSciHubLink = (url, callback) => {
  // get sci-hub domain
  chrome.storage.sync.get({ domain: "https://sci-hub.se/" }, data => {
    callback(data.domain + url);
  });
};

const openLink = event => {
  // don't open the usual link
  event.preventDefault();

  // Get the link url
  const link = event.target;
  const url = extractUrlFromLinkEvent(link);

  // If the link is marked as dead (on Sci-Hub),
  // open the original link instead
  if (link.classList.contains("__scihub--dead-link")) {
    window.open(url, "_blank");
  }
  else {
    // Otherswise, open the link with configured sci-hub domain
    withSciHubLink(url, link => window.open(link, "_blank"));
  }
};

const checkForDeadLink = element => {
  // Get the link url + configured sci-hub proxy
  const url = extractUrlFromLinkEvent(element);

  withSciHubLink(url, link => {
    // There is a requirement of using a CORS proxy (as Sci-Hub doesn't have appropriate CORS headers)
    const proxy = "https://api.allorigins.win/get?url=";
    const full = proxy + encodeURIComponent(link);
  
    fetch(full)
      .then(response => response.text())
      .then(body => {
        // All links are valid, if the #article element is present
        const valid = body.indexOf("#article") !== -1;

        if (!valid) {
          element.innerHTML += " <small style='color: #ff0000;'>Sci-Hub unavailable</small>";
          element.classList.add("__scihub--dead-link");
        }
      })
  });
};

(function () {
  // query all search results
  const links = document.querySelectorAll("#gs_res_ccl_mid .gs_rt a");

  // bind event listeners to them
  try {
    links.forEach((link) => {
      link.addEventListener("click", openLink);
      checkForDeadLink(link)
    });
  } catch (error) {
    console.warn(error);
  }
})();