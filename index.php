<?php

/* Polyfill.io
   ========================================================================== */

require_once('polyfill.php');

function Main() {
	// the current url
	$base = substr($_SERVER['DOCUMENT_ROOT'].(
		$_SERVER['QUERY_STRING'] ? substr($_SERVER['REQUEST_URI'], 0, - 1 - strlen($_SERVER['QUERY_STRING'])) : $_SERVER['REQUEST_URI']
	), strlen(dirname(__FILE__)) + 1);

	// the type
	$type = preg_match('/\.css$/', $base) ? 'css' : 'js';

	// the agent
	$agent = preg_match('/\b(gimme)\b/', $base) ? 'all' : $_SERVER['HTTP_USER_AGENT'];

	// whether minified
	$minified = !preg_match('/readable/', $base);

	// the filter
	if (preg_match('/(gimme|maybe)\((.*?)\)/', $base, $matches)) {
		$filter = '/\b('.implode('|', explode(',', $matches[2])).')\b/i';
	} else {
		$filter = null;
	}

	Polyfill::buffer(
		Polyfill::render(
			Polyfill::detect(
				$type,
				$agent,
				$filter
			),
			$type,
			$minified
		)
	);
}

Main();