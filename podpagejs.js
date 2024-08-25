// UTM Functions to get UTM parameters from URLs and append them to external links

function getUTMParameters() {
    let urlParams = new URLSearchParams(window.location.search);
    let utmParams = [];
    
    // List of UTM parameters you want to capture
    let utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

    utmKeys.forEach(function(key) {
        if (urlParams.has(key)) {
            utmParams.push(key + '=' + urlParams.get(key));
        }
    });

    return utmParams.join('&');
}

function appendUTMToLinks() {
    let utmParameters = getUTMParameters();
    if (utmParameters) {
        document.querySelectorAll('a').forEach(function(anchor) {
            let href = anchor.getAttribute('href');
            // Check if the link is external (not pointing to the same domain)
            if (href && !href.includes(window.location.hostname)) {
                // Append the UTM parameters to the link
                if (href.includes('?')) {
                    href += '&' + utmParameters;
                } else {
                    href += '?' + utmParameters;
                }
                anchor.setAttribute('href', href);
            }
        });
    }
}
window.addEventListener('load', appendUTMToLinks);

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
