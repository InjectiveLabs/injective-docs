(function() {
  function tweakLayout() {
    // Find the "On this page" heading text to locate the TOC container
    var headings = document.querySelectorAll('h2, h3, h4, p, span, div');
    for (var i = 0; i < headings.length; i++) {
      if (headings[i].textContent.trim() === 'On this page') {
        // Walk up to find the aside or column container
        var el = headings[i];
        for (var j = 0; j < 6; j++) {
          el = el.parentElement;
          if (!el) break;
          var style = window.getComputedStyle(el);
          // Look for the column container (has a fixed/min width)
          if (parseInt(style.minWidth) > 100 || parseInt(style.width) > 150) {
            el.style.maxWidth = '160px';
            el.style.minWidth = '120px';
            el.style.fontSize = '12px';
            break;
          }
        }
        break;
      }
    }
  }

  // Run after page loads and on navigation
  if (document.readyState === 'complete') {
    tweakLayout();
  } else {
    window.addEventListener('load', tweakLayout);
  }

  // Re-run on route changes (SPA navigation)
  var observer = new MutationObserver(function() {
    tweakLayout();
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();
