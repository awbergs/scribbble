<?php
/**
 * Plugin Name: Scribbble
 * Plugin URI: https://github.com/awbergs/scribbble
 * Description: A plugin for dribbble shots
 * Version: 1.0.0
 * Author: Blended Method, LLC
 * Author URI: http://www.blendedmethod.com
 * Copywright: 2014 Blended Method, LLC  
 */

//[scribbble]
function scribbble_func( $atts ){
	return '<div class="scribbble-shot" data-shotid="' . $atts['shot'] . '"></div>';
}

add_shortcode( 'scribbble', 'scribbble_func' );

function scribbble_scripts(){
    wp_enqueue_script( 'scribbble', plugins_url('/scribbble.min.js', __FILE__), null, null, true );
}
add_action( 'wp_enqueue_scripts', 'scribbble_scripts' );

function scribbble_styles(){
    wp_enqueue_style( 'scribbble', plugins_url('/scribbble.min.css', __FILE__), null, null, null );
}
add_action( 'wp_enqueue_scripts', 'scribbble_styles' );

function scribbble_settings(){

    add_settings_section(  
        'scribbble_settings_section', // Section ID 
        'Scribbble Settings', // Section Title
        'scribbble_settings_section_callback', // Callback
        'general' // What Page?  This makes the section show up on the General Settings Page
    );

    add_settings_field( // Option 1
        'scribbble_token', // Option ID
        'Token for Dribbble API access', // Label
        'scribbble_settings_callback', // !important - This is where the args go!
        'general', // Page it will be displayed (General Settings)
        'scribbble_settings_section', // Name of our section
        array( // The $args
            'scribbble_token' // Should match Option ID
        )  
    );
}
 
function scribbble_settings_section_callback() { // Section Callback
    echo '<p>Settings for scribbble plugin</p>';
}
 
function scribbble_settings_callback($args) {  // Textbox Callback
    $option = get_option($args[0]);
    echo '<input type="text" id="'. $args[0] .'" name="'. $args[0] .'" value="' . $option . '" />';
}
add_action( 'admin_init', 'scribbble_settings' );

function scribbble_write_token(){
	return '<input type="hidden" id="scribbble-token" value=' . get_option('scribbble_token') . ' />';
}
add_action( 'wp_head', 'scribbble_write_token' );


?>