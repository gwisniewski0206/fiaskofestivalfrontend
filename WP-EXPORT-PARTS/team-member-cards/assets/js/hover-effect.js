jQuery(document).ready(function($) {
    $('.tmc-team-member-card').each(function() {
        var $card = $(this);

        // Add hover class for triggering the 3D effect
        $card.hover(
            function() {
                $card.addClass('tmc-3d-hover');
            },
            function() {
                $card.removeClass('tmc-3d-hover');
            }
        );
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const truncateLength = 100; // Number of characters to show before truncating
    const teamMemberCards = document.querySelectorAll('.tmc-team-member-card .tmc-card-back .press-text');

    teamMemberCards.forEach(card => {
        const fullText = card.textContent.trim();

        if (fullText.length > truncateLength) {
            const truncatedText = fullText.substring(0, truncateLength) + '...';
            const readMoreLink = document.createElement('a');
            readMoreLink.href = '#';
            readMoreLink.textContent = ' Read more';
            readMoreLink.classList.add('read-more-link');

            // Replace the original text with truncated text
            card.textContent = truncatedText;
            card.appendChild(readMoreLink);

            // Add event listener to open the lightbox
            readMoreLink.addEventListener('click', function (e) {
                e.preventDefault();
                openLightbox(fullText);
            });
        }
    });

    // Create and manage the lightbox
    function openLightbox(content) {
        // Create lightbox elements
        const lightbox = document.createElement('div');
        lightbox.classList.add('tmc-lightbox');

        const lightboxContent = document.createElement('div');
        lightboxContent.classList.add('tmc-lightbox-content');
        lightboxContent.textContent = content;

        const closeButton = document.createElement('button');
        closeButton.textContent = 'Close';
        closeButton.classList.add('tmc-lightbox-close');

        // Append elements to lightbox
        lightboxContent.appendChild(closeButton);
        lightbox.appendChild(lightboxContent);
        document.body.appendChild(lightbox);

        // Add event listener to close the lightbox
        closeButton.addEventListener('click', function () {
            document.body.removeChild(lightbox);
        });

        // Close the lightbox when clicking outside the content
        lightbox.addEventListener('click', function (e) {
            if (e.target === lightbox) {
                document.body.removeChild(lightbox);
            }
        });
    }
});


 document.addEventListener('DOMContentLoaded', function() {
                                // JavaScript to handle button clicks and insert values into the input field
                                document.querySelectorAll('.tech-button').forEach(function(button) {
                                    button.addEventListener('click', function() {
                                        var input = document.getElementById('tech-input-<?php echo esc_attr($post_id); ?>');
                                        var currentValue = input.value;
                                        var newValue = currentValue ? currentValue + ', ' + button.getAttribute('data-value') : button.getAttribute('data-value');
                                        console.log('Button clicked:', button.getAttribute('data-value'));  // Log the button value
                                        input.value = newValue;
                                    });
                                });
                            });