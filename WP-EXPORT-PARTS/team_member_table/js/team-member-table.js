jQuery(document).ready(function($) {
    // Standardmäßig das erste Tab anzeigen
    $('.tab-pane').hide();
    $('#timetable').show();

    // Tab-Umschaltung
    $('.tab-button').on('click', function() {
        var tab = $(this).data('tab');
        
        // Alle Tabs ausblenden
        $('.tab-pane').hide();
        
        // Das angeklickte Tab anzeigen
        $('#' + tab).show();
        
        // Alle Tab-Buttons zurücksetzen und den aktuellen hervorheben
        $('.tab-button').removeClass('active');
        $(this).addClass('active');
    });
});
