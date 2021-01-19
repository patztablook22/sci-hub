chrome.runtime.onMessage.addListener(
  function(request, sender, response) {

    chrome.tabs.query(
      {active: true, currentWindow: true},
      function(tabs) {

        chrome.pageAction.show(tabs[0].id);

      });

  });

var properties = {
  "id": "parse",
  "title": "sci-hub",
  "contexts": ["link"]
}

chrome.contextMenus.create(properties)
chrome.contextMenus.onClicked.addListener(function(event) {

  window.open("https://www.sci-hub.do/" + event.linkUrl, '_blank');

});
