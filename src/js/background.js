const openLink = (event) => {

  // get sci-hub domain
  chrome.storage.sync.get({
    domain: "https://sci-hub.se/"
  }, (data) => {

    // open with given domain
    chrome.tabs.create({
      "url": data.domain + event.linkUrl
    });

  });

};

// create context menu element
chrome.contextMenus.create({
  "id": "Sci-Hub",
  "title": "Open with Sci-Hub",
  "contexts": ["link"],
});

chrome.contextMenus.onClicked.addListener(openLink);
