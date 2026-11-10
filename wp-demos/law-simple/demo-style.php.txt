<?php
add_filter('show_admin_bar', '__return_false');
/* Plugin Name: Wiśniewska Legal demo styles (mu-plugin) */
add_action('wp_enqueue_scripts', function () {
  wp_enqueue_style('wl-fonts', 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@400;500;600&display=swap&subset=latin-ext', [], null);
  wp_enqueue_style('wl-demo', content_url('mu-plugins/wl-style.css'), ['wl-fonts'], '1.0');
}, 20);
