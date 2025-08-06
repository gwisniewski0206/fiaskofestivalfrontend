<?php
/**
 * Plugin Name: Team Member Submission Form
 * Description: Erstellt ein Frontend-Formular zur Einreichung neuer Team Member Posts und integriert WPGraphQL.
 * Version: 1.1
 * Author: Dein Name
 */

// Verhindert direkten Zugriff
if (!defined('ABSPATH')) {
    exit;
}

// Verarbeiten des Formulars
function tmc_handle_form_submission() {
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['tmc_submission_nonce']) && wp_verify_nonce($_POST['tmc_submission_nonce'], 'tmc_submission_nonce')) {
        $existing_post = get_posts(array(
            'post_type' => 'team_member',
            'meta_query' => array(
                array(
                    'key'     => '_email',
                    'value'   => sanitize_text_field($_POST['email']),
                    'compare' => '='
                ),
                array(
                    'key'     => '_first_name',
                    'value'   => sanitize_text_field($_POST['artist_name']),
                    'compare' => '='
                )
            )
        ));

        if (!empty($existing_post)) {
            $post_id = $existing_post[0]->ID;
        } else {
            $post_data = array(
                'post_title'   => sanitize_text_field($_POST['artist_name']),
                'post_type'    => 'team_member',
                'post_status'  => 'draft',
            );
            $post_id = wp_insert_post($post_data);
        }

        if ($post_id) {
            update_post_meta($post_id, '_email', sanitize_text_field($_POST['email']));
            update_post_meta($post_id, '_first_name', sanitize_text_field($_POST['artist_name']));
            update_post_meta($post_id, '_last_name', sanitize_text_field($_POST['credits']));
            update_post_meta($post_id, '_position', esc_url($_POST['instagram']));
            update_post_meta($post_id, '_soundcloud', esc_url($_POST['soundcloud']));
            update_post_meta($post_id, '_food', sanitize_text_field($_POST['essen']));
            update_post_meta($post_id, '_bevs', sanitize_text_field($_POST['bevs']));
            update_post_meta($post_id, '_tech', implode(', ', $_POST['technik'] ?? []));
            update_post_meta($post_id, '_arrival', sanitize_text_field($_POST['ankunft']));
            update_post_meta($post_id, '_arrival_time', sanitize_text_field($_POST['ankunftszeit']));
            update_post_meta($post_id, '_arrival_location', sanitize_text_field($_POST['ankunftsort']));
            update_post_meta($post_id, '_tech_special', sanitize_textarea_field($_POST['tech_special']));

            // New fields for Next.js Artist interface
            update_post_meta($post_id, '_genre', sanitize_text_field($_POST['genre']));
            update_post_meta($post_id, '_day', sanitize_text_field($_POST['day']));
            update_post_meta($post_id, '_stage', sanitize_text_field($_POST['stage']));
            update_post_meta($post_id, '_time', sanitize_text_field($_POST['time']));
            update_post_meta($post_id, '_featured_artist', isset($_POST['featured_artist']) ? 1 : 0);


            if (!empty($_FILES['profilbild']['name'])) {
                require_once ABSPATH . 'wp-admin/includes/file.php';
                require_once ABSPATH . 'wp-admin/includes/media.php';
                require_once ABSPATH . 'wp-admin/includes/image.php';

                $attachment_id = media_handle_upload('profilbild', $post_id);

                if (!is_wp_error($attachment_id)) {
                    $image_url = wp_get_attachment_url($attachment_id);
                    update_post_meta($post_id, '_profile_photo', $image_url);
                } else {
                    $upload_error = $attachment_id->get_error_message();
                }
            }

            wp_redirect(home_url('/intern/form/danke-artist-submission/'));
            exit;
        }
    }
}
add_action('init', 'tmc_handle_form_submission');
