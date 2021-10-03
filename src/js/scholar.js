const openLink = (event) => {
  // don't open the usual link
  event.preventDefault();

  // get its url
  var target = event.target;
  if (target.tagName != 'A') {
    target = target.parentElement;
  }

  // get sci-hub domain
  chrome.storage.sync.get({ domain: "https://sci-hub.se/" }, data => {
    // open with the configured domain
    window.open(data.domain + target, '_blank');
  });
};

(function () {
  // query all search results
  const links = document.querySelectorAll("#gs_res_ccl_mid .gs_rt a");

  // bind event listeners to them
  try {
    links.forEach((link) => {
      link.addEventListener("click", openLink);
    });
  } catch (error) {
    console.warn(error);
  }
})();