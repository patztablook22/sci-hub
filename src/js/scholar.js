const extractUrlFromLinkEvent = event => {
  // get its url
  const target = event.target.tagName.toUpperCase() == "A" 
    ? event.target
    : event.target.parentElement;

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
  const url = extractUrlFromLinkEvent(event);

  // open the link with configured sci-hub domain
  withSciHubLink(url, link => window.open(link, "_blank"));
};

const checkForDeadLink = event => {
  console.log(event);
};

(function () {
  // query all search results
  const links = document.querySelectorAll("#gs_res_ccl_mid .gs_rt a");

  // bind event listeners to them
  try {
    links.forEach((link) => {
      link.addEventListener("mouseover", checkForDeadLink);
      link.addEventListener("click", openLink);
    });
  } catch (error) {
    console.warn(error);
  }
})();