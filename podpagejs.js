// UTM + S1-S5 Functions to get parameters from URLs and append them to external links
function getTrackingParameters() {
    let urlParams = new URLSearchParams(window.location.search);
    let trackingParams = new URLSearchParams();
    
    // List of parameters you want to capture
    let keys = [
        'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
        's1', 's2', 's3', 's4', 's5'
    ];

    // Modify the utm_campaign to append ck_subscriber_id
    if (urlParams.has('ck_subscriber_id') && urlParams.has('utm_campaign')) {
        let subscriberId = urlParams.get('ck_subscriber_id');
        let campaign = decodeURIComponent(urlParams.get('utm_campaign')); // Decode first
        let updatedCampaign = `${campaign} - ${subscriberId}`;
        urlParams.set('utm_campaign', encodeURIComponent(updatedCampaign)); // Encode once
    }

    keys.forEach(function(key) {
        if (urlParams.has(key)) {
            trackingParams.set(key, urlParams.get(key));
        }
    });

    // Always append ck_subscriber_id into s5 if available
    if (urlParams.has('ck_subscriber_id')) {
        trackingParams.set('s5', urlParams.get('ck_subscriber_id'));
    }

    return trackingParams;
}

// Function to append tracking parameters to external links
function appendTrackingToLinks() {
    let trackingParameters = getTrackingParameters();
    if (trackingParameters.toString()) {
        document.querySelectorAll('a').forEach(function(anchor) {
            let href = anchor.getAttribute('href');
            if (href && !href.includes(window.location.hostname)) {
                let parts = href.split('?');
                let linkParams = new URLSearchParams(parts[1] || '');
                
                // Only append parameters that are not already present
                trackingParameters.forEach((value, key) => {
                    if (!linkParams.has(key)) {
                        linkParams.append(key, value);
                    }
                });

                anchor.setAttribute('href', parts[0] + '?' + linkParams.toString());
            }
        });
    }
}

// Run the function on page load
window.addEventListener('load', appendTrackingToLinks);



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
