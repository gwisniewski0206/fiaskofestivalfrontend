<?php
/*
Plugin Name: Team Member Table
Description: Zeigt alle Team-Mitglieder als dynamische Tabelle im Frontend an, mit drei Ansichten (Timetable, Essen, Ankunft).
Version: 1.1
Author: Dein Name
*/

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

// Shortcode für die Anzeige der Team-Mitglieder-Tabelle
function team_member_table_shortcode() {
    ob_start();

    // Tabs für die Ansicht
    ?>
    <div id="team-member-tabs">
        <button class="tab-button" data-tab="timetable">Timetable</button>
        <button class="tab-button" data-tab="essen">Essen</button>
        <button class="tab-button" data-tab="ankunft">Ankunft</button>
    </div>

    <div id="tab-content">
        <!-- Tab: Timetable -->
        <div id="timetable" class="tab-pane">
            <?php echo render_timetable_view(); ?>
        </div>
        
        <!-- Tab: Essen -->
        <div id="essen" class="tab-pane">
            <?php echo render_essen_view(); ?>
        </div>

        <!-- Tab: Ankunft -->
        <div id="ankunft" class="tab-pane">
            <?php echo render_ankunft_view(); ?>
        </div>
    </div>

    <?php
    return ob_get_clean();
}
add_shortcode('team_member_table', 'team_member_table_shortcode');

// Funktion für das Rendern der Timetable-Ansicht
function render_timetable_view() {
    $fields = [
        'playtime' => 'Zeit',
        'artist_name' => 'Artist Name',
        'tech' => 'Tech',
    ];

    // WP Query für "team_member" Beiträge mit _floor = 1
    $args_1 = array(
        'post_type' => 'team_member',
        'posts_per_page' => -1,
        'meta_query' => array(
            array(
                'key' => '_floor',
                'value' => '1',
                'compare' => '='
            )
        ),
    );
    $query_1 = new WP_Query($args_1);

    // WP Query für "team_member" Beiträge mit _floor = 2
    $args_2 = array(
        'post_type' => 'team_member',
        'posts_per_page' => -1,
        'meta_query' => array(
            array(
                'key' => '_floor',
                'value' => '2',
                'compare' => '='
            )
        ),
    );
    $query_2 = new WP_Query($args_2);

    ob_start();
    ?>
    <div class="tables-container">
        <!-- Tabelle für Floor 1 -->
        <div class="table-container">
            <h3>Floor 1</h3>
            <table id="floor-1-table">
                <thead>
                    <tr>
                        <?php foreach ($fields as $meta_key => $label): ?>
                            <th><?php echo esc_html($label); ?></th>
                        <?php endforeach; ?>
                    </tr>
                </thead>
                <tbody>
                    <?php while ($query_1->have_posts()): $query_1->the_post(); ?>
                        <tr>
                            <td><?php
                            $timestamp = get_post_meta(get_the_ID(), '_arrival_time', true);
                            if (!empty($timestamp)) {
                                $date = new DateTime($timestamp);
                                echo esc_html($date->format('d.m.y - H:i') . ' Uhr');
                            }
                            ?>
                            </td>
                            <td><?php echo esc_html(get_post_meta(get_the_ID(), '_first_name', true)); ?></td>
                            <td><?php echo esc_html(get_post_meta(get_the_ID(), '_tech', true)); ?></td>
                        </tr>
                    <?php endwhile; ?>
                </tbody>
            </table>
        </div>

        <!-- Tabelle für Floor 2 -->
        <div class="table-container">
            <h3>Floor 2</h3>
            <table id="floor-2-table">
                <thead>
                    <tr>
                        <?php foreach ($fields as $meta_key => $label): ?>
                            <th><?php echo esc_html($label); ?></th>
                        <?php endforeach; ?>
                    </tr>
                </thead>
                <tbody>
                    <?php while ($query_2->have_posts()): $query_2->the_post(); ?>
                        <tr>
                            <td><?php
                            $timestamp = get_post_meta(get_the_ID(), '_playtime', true);
                            if (!empty($timestamp)) {
                                $date = new DateTime($timestamp);
                                echo esc_html($date->format('d.m.y - H:i') . ' Uhr');
                            }
                            ?>
                            </td>
                            <td><?php echo esc_html(get_post_meta(get_the_ID(), '_first_name', true)); ?></td>
                            <td><?php echo esc_html(get_post_meta(get_the_ID(), '_tech', true)); ?></td>
                        </tr>
                    <?php endwhile; ?>
                </tbody>
            </table>
        </div>
    </div>
<script>(function () {
    function parseDate(dateString) {
        const match = dateString.match(/(\d{2})\.(\d{2})\.(\d{2}) \u2013 (\d{2}:\d{2}) Uhr/);
        if (!match) return null;
        
        const [_, day, month, year, time] = match;
        const fullYear = `20${year}`;
        const date = new Date(`${fullYear}-${month}-${day}T${time}:00`);
        
        return { date, time };
    }
    
    function formatDate(date) {
        const days = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
        const months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
        return {
            dayName: days[date.getDay()],
            day: date.getDate(),
            month: months[date.getMonth()],
        };
    }
    
    const tables = document.querySelectorAll("table");
    tables.forEach((table) => {
        const rows = Array.from(table.querySelectorAll("tr"));
        let lastDate = null;
        
        rows.forEach((row) => {
            const cells = row.querySelectorAll("td");
            if (!cells.length) return;
            
            const timeCell = Array.from(cells).find(td => td.textContent.includes("Uhr"));
            if (!timeCell) return;
            
            const parsed = parseDate(timeCell.textContent.trim());
            if (!parsed) return;
            
            const { date, time } = parsed;
            const formatted = formatDate(date);
            
			const currentDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            const lastDateOnly = lastDate ? new Date(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate()) : null;
            
            // Insert date row if the date changes
            if (!lastDateOnly || lastDateOnly.getTime() !== currentDate.getTime()) {
                const newRow = document.createElement("tr");
                newRow.innerHTML = `<td><b>${formatted.dayName}</b></td><td><b>${formatted.day}. ${formatted.month}</b></td><td><b>${formatted.dayName}</b></td>`;
                row.parentNode.insertBefore(newRow, row);
                lastDate = date;
            }
            
            timeCell.textContent = time;
        });
    });
})();
</script>
    <style>
    /* Container für die beiden Tabellen nebeneinander */
    .tables-container {
        display: flex;
        justify-content: space-between;
        gap: 20px;
        margin-top: 20px;
    }

    .table-container {
        width: 48%; /* Jede Tabelle nimmt 48% der Breite ein */
    }

    table {
        width: 100%;
        border: 1px solid black;
        border-collapse: collapse;
    }

    th, td {
        padding: 1%;
        font-size: 0.9em;
        text-align: left;
    }

    th {
        background-color: #f0f0f0;
    }

    /* Styling für die Tabellenüberschrift */
    h3 {
        text-align: center;
        font-size: 1.2em;
        margin-bottom: 10px;
    }
    </style>

    <?php
    return ob_get_clean();
}




// Funktion für das Rendern der Essen-Ansicht
function render_essen_view() {
    $fields = [
        'food' => 'Essen',
        'artist_name' => 'Artist Name',
        'playtime_day' => 'Tag der Playtime',
    ];

    // WP Query für "team_member" Beiträge (Essen)
    $args = array(
        'post_type' => 'team_member',
        'posts_per_page' => -1,
    );
    $query = new WP_Query($args);

    ob_start();
    ?>
    <table id="essen-table">
        <thead>
            <tr>
                <?php foreach ($fields as $meta_key => $label): ?>
                    <th><?php echo esc_html($label); ?></th>
                <?php endforeach; ?>
            </tr>
        </thead>
        <tbody>
            <?php while ($query->have_posts()): $query->the_post(); ?>
                <tr>
                    <td><?php echo esc_html(get_post_meta(get_the_ID(), '_food', true)); ?></td>
                    <td><?php echo esc_html(get_post_meta(get_the_ID(), '_first_name', true) . ' ' . get_post_meta(get_the_ID(), '_last_name', true)); ?></td>
                    <td><?php echo esc_html(get_post_meta(get_the_ID(), '_playtime_day', true)); ?></td>
                </tr>
            <?php endwhile; ?>
        </tbody>
    </table>
    <?php
    return ob_get_clean();
}

// Funktion für das Rendern der Ankunft-Ansicht
function render_ankunft_view() {
    $fields = [
        'arrival_time' => 'Zeit',
        'arrival_location' => 'Ankunftsort',
        'artist_name' => 'Artist Name',
        'festival_arrival_time' => 'Ankunft am Festivalgelände',
    ];

    // WP Query für "team_member" Beiträge (Ankunft)
    $args = array(
        'post_type' => 'team_member',
        'posts_per_page' => -1,
    );
    $query = new WP_Query($args);

    ob_start();
    ?>
    <table id="ankunft-table">
        <thead>
            <tr>
                <?php foreach ($fields as $meta_key => $label): ?>
                    <th><?php echo esc_html($label); ?></th>
                <?php endforeach; ?>
            </tr>
        </thead>
        <tbody>
            <?php while ($query->have_posts()): $query->the_post(); ?>
                <tr>
                    <td><?php
$timestamp = get_post_meta(get_the_ID(), '_arrival_time', true);
if (!empty($timestamp)) {
    $date = new DateTime($timestamp);
    echo esc_html($date->format('d.m.y - H:i') . ' Uhr');
}
?>
</td>
                    <td><?php echo esc_html(get_post_meta(get_the_ID(), '_arrival_location', true)); ?></td>
                    <td><?php echo esc_html(get_post_meta(get_the_ID(), '_first_name', true) . ' ' . get_post_meta(get_the_ID(), '_last_name', true)); ?></td>
                    <td><?php echo esc_html(get_post_meta(get_the_ID(), '_festival_arrival_time', true)); ?></td>
                </tr>
            <?php endwhile; ?>
        </tbody>
    </table>
<script>
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
</script>
<style>
	
#team-member-tabs {
    margin-bottom: 20px;
}

.tab-button {
    padding: 10px 20px;
    cursor: pointer;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    margin-right: 5px;
}

.tab-button.active {
    background-color: #0073aa;
    color: white;
}

.tab-pane {
    display: none;
}
	
	table {
		width: 100%;
	}
	
	table, th, td {
  border: 1px solid black;
  border-collapse: collapse; /* Ensures no double borders */
}
	
	th, td {
		padding: 1%;
		font-size: 0.6em
	}
</style>
    <?php
    return ob_get_clean();
}

// Enqueue Scripts und Styles
function team_member_table_assets() {
    wp_enqueue_script('jquery');
    wp_enqueue_script('team-member-table-js', plugin_dir_url(__FILE__) . 'js/team-member-table.js', array('jquery'), null, true);
    wp_enqueue_style('team-member-table-css', plugin_dir_url(__FILE__) . 'css/styles.css');
}
add_action('wp_enqueue_scripts', 'team_member_table_assets');
