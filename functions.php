<?php

// =============================================================================
// FUNCTIONS.PHP
// -----------------------------------------------------------------------------
// Overwrite or add your own custom functions to Pro in this file.
// =============================================================================

// =============================================================================
// TABLE OF CONTENTS
// -----------------------------------------------------------------------------
//   01. Enqueue Parent Stylesheet
//   02. Additional Functions
// =============================================================================

// Enqueue Parent Stylesheet
// =============================================================================

add_filter('x_enqueue_parent_stylesheet', '__return_true');


// Additional Functions
// =============================================================================

/**
 * enqueue child styles & scripts
 */
function child_enqueue_styles() {
    wp_enqueue_style('k1-academy-Styles', get_stylesheet_directory_uri() . '/build/index.css', array(), '1.0.1');
    wp_enqueue_script('k1-academy-JS', get_stylesheet_directory_uri() . '/build/index.js', array(), '1.0.0', true);
    wp_localize_script('k1-academy-data', 'k1-academy-Data', array(
        'root_url' => get_site_url(),
        'day' => date('D'),
        'year' => date('T')
    ));
}
add_action('wp_enqueue_scripts', 'child_enqueue_styles');

// Lifter LMS Sidebar Functions
// =============================================================================
/**
 * Display LifterLMS Course and Lesson sidebars
 * on courses and lessons in place of the sidebar returned by
 * this function
 * @param    string     $id    default sidebar id (an empty string)
 * @return   string
 */
function my_llms_sidebar_function($id) {

    $my_sidebar_id = 'sidebar-main'; // replace this with your theme's sidebar ID

    return $my_sidebar_id;
}
add_filter('llms_get_theme_default_sidebar', 'my_llms_sidebar_function');
/**
 * Declare explicit theme support for LifterLMS course and lesson sidebars
 * @return   void
 */
function my_llms_theme_support() {
    add_theme_support('lifterlms-sidebars');
}
add_action('after_setup_theme', 'my_llms_theme_support');