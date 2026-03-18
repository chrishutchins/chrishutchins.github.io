function getTrackingParameters() {
  var urlParams = new URLSearchParams(window.location.search);
  var trackingParams = new URLSearchParams();

  // Build utm_content with ck_subscriber_id prepended:
  //   no utm_content + ck_sub → "ck:123"
  //   utm_content + ck_sub   → "ck:123|original_content"
  //   utm_content, no ck_sub → "original_content"
  var ckSub = urlParams.get('ck_subscriber_id');
  var rawContent = urlParams.get('utm_content');
  if (ckSub) {
    var utmContent = rawContent ? 'ck:' + ckSub + '|' + rawContent : 'ck:' + ckSub;
    urlParams.set('utm_content', utmContent);
  }

  // UTMs + s1-s5 sub-IDs
  var keys = [
    'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
    's1', 's2', 's3', 's4', 's5'
  ];

  keys.forEach(function (key) {
    if (urlParams.has(key)) {
      trackingParams.set(key, urlParams.get(key));
    }
  });

  // Map ck_subscriber_id → s5 and pass it through as a named param
  if (ckSub) {
    trackingParams.set('s5', ckSub);
    trackingParams.set('ck_subscriber_id', ckSub);
  }

  return trackingParams;
}

function appendTrackingToLinks() {
  var trackingParameters = getTrackingParameters();
  if (!trackingParameters.toString()) return;

  document.querySelectorAll('a').forEach(function (anchor) {
    var href = anchor.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

    try {
      var url = new URL(href, window.location.origin);

      // Don't touch anchors pointing to javascript: or blob: etc.
      if (url.protocol !== 'http:' && url.protocol !== 'https:') return;

      trackingParameters.forEach(function (value, key) {
        if (!url.searchParams.has(key)) {
          url.searchParams.set(key, value);
        }
      });

      anchor.setAttribute('href', url.toString());
    } catch (e) {
      // Skip malformed URLs
    }
  });
}

// Run as soon as possible, again on full load, and watch for dynamic content
appendTrackingToLinks();
window.addEventListener('load', appendTrackingToLinks);

var debounceTimer;
new MutationObserver(function () {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(appendTrackingToLinks, 100);
}).observe(document.body, { childList: true, subtree: true });





// Fix Review Separator

    document.addEventListener("DOMContentLoaded", function() {
        var reviewAuthors = document.querySelectorAll(".reviews-section .swiper-slide .text-center .heading-xs");
        
        reviewAuthors.forEach(function(author) {
            var textContent = author.textContent;
            var separatorIndex = textContent.indexOf(" | ");
            
            if (separatorIndex !== -1) {
                author.textContent = textContent.substring(0, separatorIndex);
            }
        });
    });

// Remove Link from Name

document.addEventListener("DOMContentLoaded", function() {
        var headingLink = document.querySelector(".testimonial-content .heading-4 .person");
        if (headingLink) {
            // Get the parent h4 element
            var heading = headingLink.parentElement;
            // Replace the <a> with its text content, including a non-breaking space before the emoji
            heading.innerHTML = headingLink.textContent.replace('Chris Hutchins 👋', 'Chris Hutchins&nbsp;👋');
        }
    });

// Remove Products from Nav
document.querySelectorAll('a.list-group-item').forEach(function(anchor) {
    if (anchor.textContent.trim() === "Products") {
        anchor.remove();
    }
});
// Change Transcript to Member Content

    document.addEventListener("DOMContentLoaded", function() {
    const transcriptLink = document.querySelector('a[href="#transcript"]');
    if (transcriptLink) {
        transcriptLink.textContent = "Member Content";
    }
});

// Change Recent Episodes Title

    document.addEventListener("DOMContentLoaded", function() {
        var header = document.querySelector("#recent-episodes-header h2.heading-2");
        if (header) {
            header.textContent = "Recent Posts and Episodes";
        }
    });

// Change Recent Posts Title
document.addEventListener("DOMContentLoaded", function() {
        var heading = document.querySelector(".recent-blog-posts-section .section-title h2.heading-2");
        if (heading) {
            heading.textContent = "Recent Newsletters";
        }
    });

// Support Advertising Disclosure Modal

const modalLink = document.getElementById('popup-link');
const modalOverlay = document.getElementById('overlay');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('close-modal');

modalLink.addEventListener('click', function(e) {
  e.preventDefault();
  modalOverlay.style.display = 'block';
  modal.style.display = 'block';
});

closeModal.addEventListener('click', function() {
  modalOverlay.style.display = 'none';
  modal.style.display = 'none';
});

modalOverlay.addEventListener('click', function() {
  modalOverlay.style.display = 'none';
  modal.style.display = 'none';
});
