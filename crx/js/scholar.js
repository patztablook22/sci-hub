(function() {

  'use strict'

  const parse = function(event) {

    event.preventDefault();
    var target = event.target
    var url = "https://sci-hub.tw/"

    if (target.tagName != 'A')
      target = target.parentElement;

    url += target;
    window.open(url, '_blank');

  }

  const bind = function() {

    const links = document.querySelectorAll(".gs_rt a");

    try {
      links.forEach(function(link) {
        link.onclick = parse;
      });
    } catch {
    }

  }

  bind();

})();
