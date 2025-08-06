<?php
/**
 * Plugin Name: Team Member Cards
 * Description: A plugin to create and display team member cards with hover photo effects, and integrate WPGraphQL.
 * Version: 1.2.2
 * Author: Your Name
 */

// Hook into 'init' action to register the custom post type
function tmc_register_team_member_post_type() {
    register_post_type('team_member', array(
        'labels' => array(
            'name' => 'Team Members',
            'singular_name' => 'Team Member',
            'add_new' => 'Add New',
            'all_items' => 'All Team Members',
            'add_new_item' => 'Add New Team Member',
        ),
        'public' => true,
        'supports' => array('title', 'editor', 'thumbnail', 'custom-fields'), // Added custom-fields support
        'show_in_rest' => true, // Enable Gutenberg editor
        'show_in_graphql' => true, // Enable GraphQL
        'graphql_single_name' => 'Artist', // Singular name in GraphQL
        'graphql_plural_name' => 'Artists', // Plural name in GraphQL
    ));
}
add_action('init', 'tmc_register_team_member_post_type');

// Register custom meta fields for WPGraphQL
function tmc_register_graphql_fields() {
    // Register 'ArtistDetails' as a GraphQL Type
    register_graphql_object_type('ArtistDetails', [
        'description' => __('Details about the artist.', 'text_domain'),
        'fields' => [
            'genre' => [
                'type' => 'String',
                'description' => __('The genre of the artist.', 'text_domain'),
                'resolve' => function ($source) {
                    return get_post_meta($source->ID, '_genre', true);
                }
            ],
            'day' => [
                'type' => 'String',
                'description' => __('The day the artist performs.', 'text_domain'),
                'resolve' => function ($source) {
                    return get_post_meta($source->ID, '_day', true);
                }
            ],
            'stage' => [
                'type' => 'String',
                'description' => __('The stage the artist performs on.', 'text_domain'),
                'resolve' => function ($source) {
                    return get_post_meta($source->ID, '_stage', true);
                }
            ],
            'time' => [
                'type' => 'String',
                'description' => __('The performance time of the artist.', 'text_domain'),
                'resolve' => function ($source) {
                    return get_post_meta($source->ID, '_time', true);
                }
            ],
            'featuredArtist' => [
                'type' => 'Boolean',
                'description' => __('Whether the artist is featured.', 'text_domain'),
                'resolve' => function ($source) {
                    return (bool) get_post_meta($source->ID, '_featured_artist', true);
                }
            ],
            'profilePhotoUrl' => [
                'type' => 'String',
                'description' => __('URL of the artist\'s profile photo.', 'text_domain'),
                'resolve' => function ($source) {
                    return get_post_meta($source->ID, '_profile_photo', true);
                }
            ],
            'instagram' => [
                'type' => 'String',
                'description' => __('Artist\'s Instagram URL.', 'text_domain'),
                'resolve' => function ($source) {
                    return get_post_meta($source->ID, '_position', true); // Mapped from _position
                }
            ],
            'soundcloud' => [
                'type' => 'String',
                'description' => __('Artist\'s Soundcloud URL.', 'text_domain'),
                'resolve' => function ($source) {
                    return get_post_meta($source->ID, '_soundcloud', true);
                }
            ],
            'credits' => [
                'type' => 'String',
                'description' => __('Credits for the artist.', 'text_domain'),
                'resolve' => function ($source) {
                    return get_post_meta($source->ID, '_last_name', true); // Mapped from _last_name
                }
            ],
            'personalTouch' => [
                'type' => 'String',
                'description' => __('Personal text from the artist.', 'text_domain'),
                'resolve' => function ($source) {
                    return get_post_meta($source->ID, '_personal_touch', true);
                }
            ],
            'foodPreference' => [
                'type' => 'String',
                'description' => __('Artist\'s food preference.', 'text_domain'),
                'resolve' => function ($source) {
                    return get_post_meta($source->ID, '_food', true);
                }
            ],
            'beverageRequest' => [
                'type' => 'String',
                'description' => __('Artist\'s beverage request.', 'text_domain'),
                'resolve' => function ($source) {
                    return get_post_meta($source->ID, '_bevs', true);
                }
            ],
            'techSetup' => [
                'type' => 'String',
                'description' => __('Artist\'s technical setup requirements.', 'text_domain'),
                'resolve' => function ($source) {
                    return get_post_meta($source->ID, '_tech', true);
                }
            ],
            'arrivalMethod' => [
                'type' => 'String',
                'description' => __('Artist\'s arrival method (car/train).', 'text_domain'),
                'resolve' => function ($source) {
                    return get_post_meta($source->ID, '_arrival', true);
                }
            ],
            'arrivalTime' => [
                'type' => 'String',
                'description' => __('Artist\'s arrival time.', 'text_domain'),
                'resolve' => function ($source) {
                    return get_post_meta($source->ID, '_arrival_time', true);
                }
            ],
            'arrivalLocation' => [
                'type' => 'String',
                'description' => __('Artist\'s arrival location.', 'text_domain'),
                'resolve' => function ($source) {
                    return get_post_meta($source->ID, '_arrival_location', true);
                }
            ],
            'techSpecial' => [
                'type' => 'String',
                'description' => __('Artist\'s special technical requirements.', 'text_domain'),
                'resolve' => function ($source) {
                    return get_post_meta($source->ID, '_tech_special', true);
                }
            ],
        ],
    ]);

    // Add the 'artistDetails' field to the 'Artist' post type in GraphQL
    register_graphql_field('Artist', 'artistDetails', [
        'type' => 'ArtistDetails',
        'description' => __('Artist specific details.', 'text_domain'),
        'resolve' => function ($source) {
            return $source; // Pass the post object to the resolver of ArtistDetails
        }
    ]);
}
add_action('graphql_register_types', 'tmc_register_graphql_fields');

// Meta Fields Array
function tmc_get_meta_fields() {
    return [
        'email' => 'E-Mail',
        'profile_photo' => 'Presspic',
        'first_name' => 'Artist Name',
        'last_name' => 'Credits',
        'position' => 'Instagram',
        'soundcloud' => 'Soundcloud',
        'personal_touch' => 'Pressetext',
        'location' => 'Hometown',
        'food' => 'Essen',
        'bevs' => 'Getränkewunsch',
        'tech' => 'Technik',
        'arrival' => 'Ankunft',
        'arrival_time' => 'Ankunftszeit',
        'arrival_location' => 'Ankunftsort',
        'playtime' => 'Playtime',
        'floor' => 'Floor',
        'festival_arrival_time' => 'Ankunftszeit Festivalgelände',
        'genre' => 'Genre', // New field
        'day' => 'Day',     // New field
        'stage' => 'Stage',   // New field
        'time' => 'Time',    // New field
        'featured_artist' => 'Featured Artist', // New field
        'tech_special' => 'Besondere Anforderungen', // New field
    ];
}

// Register the meta box for adding team member details
function tmc_add_meta_boxes() {
    add_meta_box('team_member_details', 'Team Member Details', 'tmc_display_meta_box', 'team_member', 'side');
}
add_action('add_meta_boxes', 'tmc_add_meta_boxes');

// Display the meta box fields
function tmc_display_meta_box($post) {
    $fields = tmc_get_meta_fields();
    foreach ($fields as $key => $label) {
        $value = get_post_meta($post->ID, "_" . $key, true);
        echo "<label for='" . $key . "'><h4>" . $label . "</h4></label>";
        if ($key === 'personal_touch') {
            echo "<p><textarea id='" . $key . "' name='" . $key . "'>" . esc_textarea($value) . "</textarea></p>";
        } elseif ($key === 'featured_artist') {
            $checked = checked(1, $value, false);
            echo "<p><input type='checkbox' id='" . $key . "' name='" . $key . "' value='1' " . $checked . " /></p>";
        } else {
            echo "<p><input type='text' id='" . $key . "' name='" . $key . "' value='" . esc_attr($value) . "' /></p>";
        }
    }
}

// Speichern der Metadaten für das Bild (z.B. für das Profilfoto)
function tmc_save_meta_box($post_id) {
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (!current_user_can('edit_post', $post_id)) return;

    foreach (tmc_get_meta_fields() as $field => $label) {
        if (isset($_POST[$field])) {
            $value = sanitize_text_field($_POST[$field]);
            if ($field === 'personal_touch') {
                $value = sanitize_textarea_field($_POST[$field]);
            } elseif ($field === 'featured_artist') {
                $value = isset($_POST[$field]) ? 1 : 0;
            }
            update_post_meta($post_id, "_" . $field, $value);
        }
    }

    // Aktualisiere das Profilfoto mit der neuesten Version aus der Mediathek, wenn das Bild geändert wurde
    if (isset($_POST['_profile_photo'])) {
        $profile_photo_id = absint($_POST['_profile_photo']);
        
        // Holen der neuesten Bildversion (z.B. nach Zuschnitt)
        $new_image_url = wp_get_attachment_image_url($profile_photo_id, 'full');
        update_post_meta($post_id, '_profile_photo', $new_image_url);
    }
}
add_action('save_post', 'tmc_save_meta_box');


// Add columns to admin list view
function tmc_set_custom_columns($columns) {
    $columns['email'] = 'E-Mail';
    $columns['first_name'] = 'Artist Name';
    $columns['last_name'] = 'Credits';
    $columns['position'] = 'Instagram';
    $columns['soundcloud'] = 'Soundcloud';
    $columns['playtime'] = 'Playtime';
    $columns['floor'] = 'Floor';
    $columns['food'] = 'Essen';
    $columns['bevs'] = 'Getränkewunsch';
    $columns['tech'] = 'Technik';
    $columns['arrival'] = 'Ankunft - Auto oder Zug?';
    $columns['arrival_time'] = 'Ankunftszeit Auto/Zug';
    $columns['arrival_location'] = 'Ankunftsort';
    $columns['festival_arrival_time'] = 'Ankunft beim Festival';
    $columns['genre'] = 'Genre'; // New column
    $columns['day'] = 'Day';     // New column
    $columns['stage'] = 'Stage';   // New column
    $columns['time'] = 'Time';    // New column
    $columns['featured_artist'] = 'Featured'; // New column
    $columns['personal_touch'] = 'Has Presstext'; // New column for checking if personal_touch exists
    return $columns;
}
add_filter('manage_team_member_posts_columns', 'tmc_set_custom_columns');

// Populate columns with data
function tmc_custom_column_content($column, $post_id) {
    if ($column === 'personal_touch') {
        $value = get_post_meta($post_id, '_personal_touch', true);
        echo !empty($value) ? 'true' : 'false'; // Show "true" if it exists, "false" otherwise
    } elseif ($column === 'featured_artist') {
        $value = get_post_meta($post_id, '_featured_artist', true);
        echo (bool) $value ? 'Yes' : 'No';
    } else {
        $fields = tmc_get_meta_fields();
        if (array_key_exists($column, $fields)) {
            echo esc_html(get_post_meta($post_id, "_" . $column, true));
        }
    }
}
add_action('manage_team_member_posts_custom_column', 'tmc_custom_column_content', 10, 2);


function tmc_quick_edit_custom_box($column_name, $post_type) {
    if ($post_type !== 'team_member') return;
    
    $fields = tmc_get_meta_fields();
    if (array_key_exists($column_name, $fields)) {
        ?>
        <fieldset class="inline-edit-col-right">
        <div class="inline-edit-col">
            <label>
                <span class="title"><?php echo esc_html($fields[$column_name]); ?></span>                    
                
                <?php if ($column_name === 'playtime') : ?>                 
                    <div class="half right">
                        <div class="picker">
                            <select class="datePicker"></select>
                            <select class="hourPicker"></select>
                            <select class="minutePicker"></select>
                        <input type="text" name="playtime" class="ankunftszeit-input">
                        </div>
                        <!-- Verstecktes Input-Feld für die eigentliche Datums- und Zeitübertragung -->
                    </div>
                <?php elseif ($column_name === 'floor') : ?>                                        
                    <select name="<?php echo esc_attr($column_name); ?>" class="tmc-quick-edit-field">
                        <option value="1">Floor 1</option>
                        <option value="2">Floor 2</option>
                    </select>
                <?php elseif ($column_name === 'personal_touch') : ?> 
                    <!-- Nur ein Label für personal_touch -->
                    <span><?php echo esc_html($fields[$column_name]); ?></span>
                <?php elseif ($column_name === 'featured_artist') : ?>
                    <input type="checkbox" name="<?php echo esc_attr($column_name); ?>" value="1" />
                <?php else : ?>
                    <input type="text" name="<?php echo esc_attr($column_name); ?>" class="tmc-quick-edit-field" />
                <?php endif; ?>
                
            </label>
        </div>
        </fieldset>

        <style>
            .picker {
                display: flex;
                justify-content: space-between;
                gap: 5px;
                width: 100%;
            }

            select {
                width: 30%;
                padding: 10px;
                font-size: 16px;
                border-radius: 5px;
                border: 1px solid #aaa;
                text-align: center;
                appearance: none; /* Entfernt Standard-Styling */
                background-color: white;
                cursor: pointer;
            }
        </style>

       <script>
function initializeDatepickers() {
    const pickerWrappers = document.querySelectorAll('.picker');

    pickerWrappers.forEach(function(pickerWrapper) {
        const datePicker = pickerWrapper.querySelector('.datePicker');
        const hourPicker = pickerWrapper.querySelector('.hourPicker');
        const minutePicker = pickerWrapper.querySelector('.minutePicker');
        const datetimeInput = pickerWrapper.querySelector('input[name="playtime"]');

        pickerWrapper.addEventListener("change", function(event) {
            if (event.target === datePicker) {
                updateHours();
            }
            updateDatetimeInput();
        });
        
        // Sicherstellen, dass alle Picker vorhanden sind
        if (!datePicker || !hourPicker || !minutePicker || !datetimeInput) {
            console.error('Fehler: Ein oder mehrere Picker-Elemente fehlen.');
            return;
        }

        const startDate = new Date(2025, 5, 6, 10, 0); // 6. Juni 2025, 10:00 Uhr
        const endDate = new Date(2025, 5, 8, 23, 0);  // 8. Juni 2025, 23:00 Uhr

        // Fülle die Datumsoptionen (6. - 8. Juni)
        for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
            let option = document.createElement("option");
            option.value = d.toISOString().split("T")[0];
            option.textContent = d.toLocaleDateString("de-DE", { weekday: 'long', day: '2-digit', month: 'long' });
            datePicker.appendChild(option);
        }

        // Fülle Stundenoptionen (10:00 - 23:00 für den ersten Tag, 0:00 - 23:00 für die anderen)
        function updateHours() {
            hourPicker.innerHTML = "";
            let selectedDate = new Date(datePicker.value);
            let minHour = selectedDate.getDate() === startDate.getDate() ? 10 : 0;
            let maxHour = selectedDate.getDate() === endDate.getDate() ? 23 : 23;

            for (let h = minHour; h <= maxHour; h++) {
                let option = document.createElement("option");
                option.value = h.toString().padStart(2, "0");
                option.textContent = h.toString().padStart(2, "0");
                hourPicker.appendChild(option);
            }
        }

        // Fülle Minutenoptionen (immer 00 und 30)
        function updateMinutes() {
            minutePicker.innerHTML = "";
            [0, 30].forEach(m => {
                let option = document.createElement("option");
                option.value = m.toString().padStart(2, "0");
                option.textContent = m.toString().padStart(2, "0");
                minutePicker.appendChild(option);
            });
        }

        // Aktualisiert das versteckte Input-Feld für das Formular
        function updateDatetimeInput() {
            let selectedDate = datePicker.value;
            let selectedHour = hourPicker.value.padStart(2, "0");
            let selectedMinute = minutePicker.value.padStart(2, "0");

            if (datetimeInput && selectedDate && selectedHour && selectedMinute) {
                let datetimeValue = `${selectedDate}T${selectedHour}:${selectedMinute}`;
                //datetimeInput.value = datetimeValue;

                // Zusätzlich den playtime-Wert im Input-Field setzen
                const playtimeInput = document.querySelector('input[name="playtime"]');
                if (playtimeInput) {
                    playtimeInput.value = datetimeValue;
                }
            }
        }

        // Initiales Füllen der Dropdowns
        updateHours();
        updateMinutes();
        updateDatetimeInput();
    });
}
function getPostIdFromParentRow(element) {
    // Gehe vom aktuellen Element nach oben zum Eltern-TR und hole die ID
    const parentRow = element.closest('tr');
    if (parentRow && parentRow.id.startsWith('edit-')) {
        return parentRow.id;
    }
    return null;
}		   
		   

function waitForElementAndInitialize(callback) {
    const interval = setInterval(function() {
        // Hier kannst du nach einem bestimmten inneren Element suchen, z.B. dem Datepicker
        const pickerWrapper = document.querySelector('.picker');
        if (pickerWrapper) {
            // Holen der Post-ID aus dem übergeordneten <tr> und ID dynamisch zusammenstellen
            const postId = getPostIdFromParentRow(pickerWrapper);
            if (postId) {
                const elementId = postId;
                const element = document.getElementById(elementId);
                if (element) {
                    clearInterval(interval);
                    callback();
                }
            }
        }
    }, 100);
}

		   
waitForElementAndInitialize(function() {
    initializeDatepickers();
});

</script>


        <?php
    }
}
add_action('quick_edit_custom_box', 'tmc_quick_edit_custom_box', 10, 2);



// Save Quick Edit Data
function tmc_quick_edit_save($post_id) {
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (!current_user_can('edit_post', $post_id)) return;

    foreach (tmc_get_meta_fields() as $field => $label) {
        if (isset($_POST[$field])) {
            update_post_meta($post_id, "_" . $field, sanitize_text_field($_POST[$field]));
        }
    }
}
add_action('save_post', 'tmc_quick_edit_save');

// Enqueue Admin Script for Quick Edit
function tmc_enqueue_admin_scripts($hook) {
    if ($hook === 'edit.php' && get_current_screen()->post_type === 'team_member') {
        wp_enqueue_script('tmc-admin-quick-edit', plugin_dir_url(__FILE__) . 'assets/js/quick-edit.js', array('jquery'), null, true);
    }
}
add_action('admin_enqueue_scripts', 'tmc_enqueue_admin_scripts');

// JavaScript to Auto-Fill Quick Edit Fields
add_action('admin_footer', function () {
    ?>
    <script>
jQuery(document).ready(function($) {
    function fillQuickEdit(row) {
        var post_id = row.attr('id').replace('post-', '');
        var fields = <?php echo json_encode(array_keys(tmc_get_meta_fields())); ?>;

        fields.forEach(function(field) {
            var value = row.find('.column-' + field).text().trim();
            var inputField = $('input[name="' + field + '"]');
            var selectField = $('select[name="' + field + '"]');

            // Überprüfen, ob das Input-Feld die Klasse "ankunftszeit-input" hat
            if (inputField.hasClass('ankunftszeit-input')) {
                return; // Falls ja, Wert nicht setzen und zum nächsten Feld gehen
            }

            if (inputField.length) {
                inputField.val(value);
            } else if (selectField.length) {
                selectField.val(value).change(); // Setzt den Wert für Selects
            }
        });
    }

    $(document).on('click', '.editinline', function() {
        var row = $(this).closest('tr');
        setTimeout(function() {
            fillQuickEdit(row);
        }, 200);
    });
});

    </script>
    <?php
});

// Enqueue scripts and styles
function tmc_enqueue_scripts() {
    wp_enqueue_script('jquery');
    wp_enqueue_script('tmc-hover-effect', plugin_dir_url(__FILE__) . 'assets/js/hover-effect.js', array('jquery'), null, true);
    wp_enqueue_style('tmc-styles', plugin_dir_url(__FILE__) . 'assets/css/styles.css');
}
add_action('wp_enqueue_scripts', 'tmc_enqueue_scripts');


// Shortcode to display team member cards
function tmc_team_member_shortcode() {
    $args = array(
        'post_type' => 'team_member',
        'posts_per_page' => -1,
    );
    $query = new WP_Query($args);

    ob_start();

    echo '<div class="tmc-team-members-container"><div class="tmc-team-members-grid">';
    while ($query->have_posts()) {
        $query->the_post();
        $profile_photo = get_post_meta(get_the_ID(), '_profile_photo', true);
        $first_name = get_post_meta(get_the_ID(), '_first_name', true);
        $last_name = get_post_meta(get_the_ID(), '_last_name', true);
        $position = get_post_meta(get_the_ID(), '_position', true);
        $soundcloud = get_post_meta(get_the_ID(), '_soundcloud', true);
        $personal_touch = get_post_meta(get_the_ID(), '_personal_touch', true);
        $location = get_post_meta(get_the_ID(), '_location', true);

        ?>
        <div class="tmc-team-member-card" tabindex="0">
    <div class="tmc-card-inner">
        <div class="tmc-card-front">
            <div class="tmc-profile-photo">
                <img src="<?php echo esc_url($profile_photo); ?>" alt="Profile Photo of Artist: <?php echo esc_html($first_name); ?>">
            </div>
            <h3><?php echo esc_html($first_name); ?></h3>
            <p class="credits">
                <?php echo esc_html($last_name); ?>
            </p>
        </div>
        <div class="tmc-card-back">
            <?php if (!empty($personal_touch)) : ?>
                <p class="press-text"> <?php echo esc_html($personal_touch); ?> </p>
            <?php endif; ?>
            
            <?php if (!empty($soundcloud)) : ?>
                <a style="text-decoration: none;" href="<?php echo esc_url($soundcloud); ?>">
                    <img class="sc-icon" src="https://vivalafiasko.de/wp-content/plugins/team-member-cards/soundcloud.png" alt="Soundcloud icon linking to the soundcloud profile of <?php echo esc_html($first_name); ?>">
                </a>
            <?php endif; ?>
            
            <?php if (!empty($position)) : ?>
                <a style="text-decoration: none;" href="<?php echo esc_url($instagram); ?>">
                    <img class="ig-icon" src="https://vivalafiasko.de/wp-content/plugins/team-member-cards/instagram.png" alt="Instagram icon linking to the instagram profile of <?php echo esc_html($first_name); ?>">
                </a>
            <?php endif; ?>
        </div>
    </div>
</div>

        <?php
    }
    wp_reset_postdata();
    echo '</div></div>';

    return ob_get_clean();
}
add_shortcode('team_members', 'tmc_team_member_shortcode');
?>