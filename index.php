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

	$hasMaybe = preg_match_all('/maybe\((.*?)\)/', $base, $maybeMatches);
	$hasGimme = !$hasMaybe && preg_match_all('/gimme\((.*?)\)/', $base, $gimmeMatches);

	if ($hasMaybe) {
		Polyfill::buffer(Polyfill::$type(null, $minified, '/\b('.implode('|', explode(',', $maybeMatches[1][0])).')\b/i', false), $minified, false);
	} else if ($hasGimme) {
		Polyfill::buffer(Polyfill::$type(null, $minified, '/\b('.implode('|', explode(',', $gimmeMatches[1][0])).')\b/i', true), $minified, true);
	} else {
		Polyfill::buffer(Polyfill::$type(null, $minified), $minified, false, false);
	}
}

Main();