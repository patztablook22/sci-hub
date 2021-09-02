const hide = () => {

  let article = document.querySelector("iframe");
  if (article == null)
    article = document.querySelector("embed");

  if (article != null) {

    article.style.position = "fixed";
    article.style.width    = "100%";
    article.style.zIndex   = 2;
    article.style.top      = 0;
    article.style.padding  = 0;
    article.style.margin   = 0;
    article.style.left     = 0;
    article.style.border   = 0;

  }
};

// get user preferences
chrome.storage.sync.get({
  hide: true
}, (data) => {

  // apply them
  if (data.hide)
    hide();

});
