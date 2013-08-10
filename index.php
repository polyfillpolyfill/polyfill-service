<?php

/* Polyfill.io
   ========================================================================== */

require_once('polyfill.php');

function Main() {
	$base = substr($_SERVER['DOCUMENT_ROOT'].(
		$_SERVER['QUERY_STRING'] ? substr($_SERVER['REQUEST_URI'], 0, - 1 - strlen($_SERVER['QUERY_STRING'])) : $_SERVER['REQUEST_URI']
	), strlen(dirname(__FILE__)) + 1);

	$type = isset($_GET['_css']) || preg_match('/\.css$/', $base) ? 'style' : 'script';

	$minified = !isset($_GET['!']) && !preg_match('/readable/', $base);

	Polyfill::buffer($type, $minified);
}

Main();