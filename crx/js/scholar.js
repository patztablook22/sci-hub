const openLink = (event) => {

  // don't open the usual link
  event.preventDefault();

  // get its url
  var target = event.target;
  if (target.tagName != 'A')
    target = target.parentElement;

  // get sci-hub domain
  chrome.storage.sync.get({
    domain: "https://sci-hub.se/"
  }, (data) => {

    // open with given domain
    window.open(data.domain + target, '_blank');

  });

};

const bind = () => {

  // query all search results
  const links = document.querySelectorAll("#gs_res_ccl_mid .gs_rt a");

  // bind them
  try {
    links.forEach((link) => {
      link.onclick = openLink;
    });
  } catch {
  }

};

bind();
