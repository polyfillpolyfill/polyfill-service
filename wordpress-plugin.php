<?php
/**
 * Plugin Name: Polyfill
 * Plugin URI: //github.com/jonathantneal/Polyfill
 * Description: A Polyfill combinator.
 * Version: 0.1
 * Author: Jonathan Neal
 * Author URI: //twitter.com/jon_neal
 * License: CC0 //creativecommons.org/publicdomain/zero/1.0
 */

class WP_Polyfill {
	static $scriptName = 'index.php';

	function admin_menu() {
		add_options_page('Polyfill', 'Polyfill', 1, 'polyfill', array(WP_Polyfill, 'admin_menu_include'));
	}

	function admin_menu_include() {
		$scriptURL = plugins_url(basename(dirname(__FILE__))).'/'.self::$scriptName;

		print('<h1>Polyfill</h1>');
		print('<p>Polyfill is <a href="'.$scriptURL.'">running</a>.</p>');
	}

	function wp_head() {
		$scriptURL = plugins_url(basename(dirname(__FILE__))).'/'.self::$scriptName;

		print('<script src="'.$scriptURL.'"></script>');
	}
}

add_action('admin_menu', array(WP_Polyfill, 'admin_menu'), 1);
add_action('wp_head', array(WP_Polyfill, 'wp_head'), 1);