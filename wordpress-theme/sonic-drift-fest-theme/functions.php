<?php

function sonic_drift_fest_theme_scripts() {
    // Enqueue React app's CSS
    wp_enqueue_style(
        'sonic-drift-fest-react-css',
        get_template_directory_uri() . '/../../dist/assets/index.css',
        array(),
        null
    );

    // Enqueue React app's JavaScript
    wp_enqueue_script(
        'sonic-drift-fest-react-js',
        get_template_directory_uri() . '/../../dist/assets/index.js',
        array(),
        null,
        true // Load in footer
    );
}
    );
}
add_action( 'wp_enqueue_scripts', 'sonic_drift_fest_theme_scripts' );

// Disable Gutenberg block styles
function disable_gutenberg_styles() {
    wp_dequeue_style( 'wp-block-library' );
    wp_dequeue_style( 'wp-block-library-theme' );
    wp_dequeue_style( 'wc-block-style' ); // WooCommerce blocks
}
add_action( 'wp_enqueue_scripts', 'disable_gutenberg_styles', 100 );

?>