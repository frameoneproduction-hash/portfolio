<?php
add_filter('show_admin_bar', '__return_false');
/* Plugin Name: OGIEŃ demo styles (mu-plugin) */
add_action('wp_enqueue_scripts', function () {
  wp_enqueue_style('og-fonts', 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@500;700;800&family=DM+Sans:wght@400;500;700&display=swap&subset=latin-ext', [], null);
  wp_enqueue_style('og-demo', content_url('mu-plugins/og-style.css'), ['og-fonts'], '1.0');
}, 20);
