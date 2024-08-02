// Remove Credit Cards Link
document.addEventListener("DOMContentLoaded", function() {
            const cclink = document.querySelector('a[href="https://www.chrishutchins.com/p/ccnav/"]');
            if (cclink) {
                cclink.textContent = "Credit-Cards";
            }
        });

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
document.addEventListener("DOMContentLoaded", function() {
    // Define the showModal and hideModal functions
    function showModal() {
        document.getElementById("overlay").style.display = "block";
        document.getElementById("modal").style.display = "block";
    }

    function hideModal() {
        document.getElementById("overlay").style.display = "none";
        document.getElementById("modal").style.display = "none";
    }

    // Find the target dropdown menu
    var dropdownMenu = document.querySelector("#nav-custom-about .dropdown-menu .list-group");

    // Create a new list-group item
    var newListItem = document.createElement("a");
    newListItem.href = "#";
    newListItem.classList.add("list-group-item", "list-group-item-action", "d-flex", "new_window", "align-items-center", "justify-content-between");
    newListItem.id = "popup-link-new"; // Assign a unique ID
    newListItem.textContent = "Advertiser Disclosure";

    // Append the new list item to the dropdown menu
    dropdownMenu.appendChild(newListItem);

    // Add event listener to the new list item to show the modal
    newListItem.addEventListener("click", function(event) {
        event.preventDefault();
        showModal();
    });

    // Add event listener to the original popup link
    var originalPopupLink = document.getElementById("popup-link");
    if (originalPopupLink) {
        originalPopupLink.addEventListener("click", function(event) {
            event.preventDefault();
            showModal();
        });
    }

    // Add event listener to the close button
    var closeModalButton = document.getElementById("close-modal");
    if (closeModalButton) {
        closeModalButton.addEventListener("click", function(event) {
            event.preventDefault();
            hideModal();
        });
    }

    // Add event listener to the overlay to close the modal when clicked
    var overlay = document.getElementById("overlay");
    if (overlay) {
        overlay.addEventListener("click", function(event) {
            event.preventDefault();
            hideModal();
        });
    }
});
