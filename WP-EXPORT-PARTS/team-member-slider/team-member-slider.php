<?php
/**
 * Plugin Name: Team Member Slider
 * Description: A plugin to create and display team member cards in a slider format.
 * Version: 1.4
 * Author: Your Name
 */

// Register the custom post type with a unique name
function tms_register_team_member_slider_post_type() {
    register_post_type('team_member_slider', array(
        'labels' => array(
            'name' => __('Team Members Slider', 'tms'),
            'singular_name' => __('Team Member', 'tms'),
            'add_new' => __('Add New', 'tms'),
            'all_items' => __('All Team Members', 'tms'),
            'add_new_item' => __('Add New Team Member', 'tms'),
        ),
        'public' => true,
        'supports' => array('title', 'editor', 'thumbnail'),
        'show_in_rest' => true,
        'show_in_graphql' => true, // Enable GraphQL
        'graphql_single_name' => 'SliderArtist', // Singular name in GraphQL
        'graphql_plural_name' => 'SliderArtists', // Plural name in GraphQL
    ));
}
add_action('init', 'tms_register_team_member_slider_post_type');

// Add meta box for team member details
function tms_add_meta_boxes() {
    add_meta_box('team_member_details', __('Team Member Details', 'tms'), 'tms_display_meta_box', 'team_member_slider', 'side');
    add_meta_box('team_member_order', __('Team Member Order', 'tms'), 'tms_display_order_meta_box', 'team_member_slider', 'side');
}
add_action('add_meta_boxes', 'tms_add_meta_boxes');

// Display the meta box for team member details
function tms_display_meta_box($post) {
    $fields = [
        '_profile_photo' => __('Presspic', 'tms'),
        '_first_name' => __('Artist Name', 'tms'),
        '_last_name' => __('Credits', 'tms'),
        '_position' => __('Instagram', 'tms'),
        '_soundcloud' => __('Soundcloud', 'tms'),
        '_personal_touch' => __('Personal Touch', 'tms'),
        '_location' => __('Hometown', 'tms'),
    ];

    foreach ($fields as $key => $label) {
        $value = get_post_meta($post->ID, $key, true);
        echo "<p><label for='$key'>$label</label>";
        if ($key === '_personal_touch') {
            echo "<textarea id='$key' name='$key' rows='3' style='width: 100%;'>" . esc_textarea($value) . "</textarea></p>";
        } else {
            echo "<input type='text' id='$key' name='$key' value='" . esc_attr($value) . "' style='width: 100%;' /></p>";
        }
    }
}

// Display the order meta box
function tms_display_order_meta_box($post) {
    $order = get_post_meta($post->ID, '_order_number', true);
    echo "<p><label for='_order_number'>" . __('Order Number', 'tms') . "</label>";
    echo "<input type='number' id='_order_number' name='_order_number' value='" . esc_attr($order) . "' style='width: 100%;' /></p>";
}

// Save meta box data
function tms_save_meta_box($post_id) {
    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    $fields = ['_profile_photo', '_first_name', '_last_name', '_position', '_soundcloud', '_personal_touch', '_location', '_order_number'];

    foreach ($fields as $field) {
        if (isset($_POST[$field])) {
            $value = ($_POST[$field]);
            if ($field === '_personal_touch') {
                $value = sanitize_textarea_field($value);
            } else {
                $value = sanitize_text_field($value);
            }
            update_post_meta($post_id, $field, $value);
        }
    }
}
add_action('save_post', 'tms_save_meta_box');

// Enqueue styles and scripts


function tms_enqueue_scripts() {
    wp_enqueue_script('swiper-js', 'https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.js', array(), null, true);
    wp_enqueue_style('swiper-css', 'https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.css');
    wp_enqueue_style('tms-styles', plugin_dir_url(__FILE__) . 'assets/css/styles.css');
    wp_enqueue_script('tms-slider-init', plugin_dir_url(__FILE__) . 'assets/js/slider-init.js', array('swiper-js'), null, true);
}
add_action('wp_enqueue_scripts', 'tms_enqueue_scripts');

// Shortcode to display the slider
function tms_team_member_slider_shortcode() {
    $args = array(
        'post_type' => 'team_member_slider',
        'posts_per_page' => -1,
        'meta_key' => '_order_number',
        'orderby' => 'meta_value_num',
        'order' => 'ASC',
    );
    $query = new WP_Query($args);

    if (!$query->have_posts()) {
        return '<p>' . __('No team members found.', 'tms') . '</p>';
    }

    ob_start();
    ?>
    <div class="main-slider-wrap">
        <div class="swiper-container tms-team-member-slider">
            <div class="swiper-wrapper">
                <?php
                while ($query->have_posts()) {
                    $query->the_post();
                    $profile_photo = get_post_meta(get_the_ID(), '_profile_photo', true);
                    $first_name = get_post_meta(get_the_ID(), '_first_name', true);
                    $last_name = get_post_meta(get_the_ID(), '_last_name', true);
                    $position = get_post_meta(get_the_ID(), '_position', true);
                    $soundcloud = get_post_meta(get_the_ID(), '_soundcloud', true);
                    $personal_touch = get_post_meta(get_the_ID(), '_personal_touch', true);
                    
                    // Generate descriptive alt text
                    $alt_text = !empty($first_name) ? esc_attr($first_name . ' - Artist Press Photo') : 'Team Member Profile Picture';
                    $alt_instagram = !empty($first_name) ? esc_attr($first_name . ' - Instagram') : 'Instagram Icon';
                    $alt_soundcloud = !empty($first_name) ? esc_attr($first_name . ' - SoundCloud') : 'SoundCloud Icon';

                    ?>
                    <div class="swiper-slide"tabindex="0">
                        <div class="tms-team-member-card" >
                            <div class="tms-card-inner">
                                <div class="tms-card-front">
                                    <div class="image-container">
                                        <img src="<?php echo esc_url($profile_photo); ?>" alt="<?php echo $alt_text; ?>" class="tms-profile-photo">
                                    </div>
                                    <div class="info-container">
                                        <h3 class="artist-name-slider"><?php echo esc_html($first_name); ?></h3>
                                        <p class="artist-credits-slider"><?php echo esc_html($last_name); ?></p>
                                    </div>
                                </div>
                                <div class="tms-card-back">
                                    <p><?php echo esc_html($personal_touch); ?></p>
                                    <a href="<?php echo esc_url($soundcloud); ?>" target="_blank">
                                        <img class="sc-icon" src="https://vivalafiasko.de/wp-content/plugins/team-member-cards/soundcloud.png" alt="<?php echo $alt_soundcloud; ?>">
                                    </a>
                                    <a href="<?php echo esc_url($position); ?>" target="_blank">
                                        <img class="ig-icon" src="https://vivalafiasko.de/wp-content/plugins/team-member-cards/instagram.png" alt="<?php echo $alt_instagram; ?>">
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                <?php
                }
                ?>
            </div>
            <div class="swiper-pagination"></div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
        </div>
    </div>
    <?php
    wp_reset_postdata();
    return ob_get_clean();
}
add_shortcode('team_members_slider', 'tms_team_member_slider_shortcode');
?>