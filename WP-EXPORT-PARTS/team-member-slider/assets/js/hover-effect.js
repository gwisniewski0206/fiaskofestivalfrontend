jQuery(document).ready(function($) {
    $('.tms-team-member-card').each(function() {
        var $card = $(this);

        // Add hover class for triggering the 3D effect
        $card.hover(
            function() {
                $card.addClass('tms-3d-hover');
            },
            function() {
                $card.removeClass('tms-3d-hover');
            }
        );
    });
});
