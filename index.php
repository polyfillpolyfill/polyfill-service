<?php

/* Polyfill.io
   ========================================================================== */

$minified = !isset($_GET['!']);
$css = isset($_GET['_css']);
$list = $_SERVER['QUERY_STRING'];

$dir = dirname(__FILE__).'/';
$scriptdir = $dir.($minified ? 'minified/' : 'source/');
$mtime = filemtime(__FILE__);
$br = $minified ? '' : PHP_EOL.PHP_EOL;
$buffer = array();

$agentList = json_decode(file_get_contents($dir.'agent.json'), true);
$polyfillList = json_decode(file_get_contents($dir.($css ? 'normalize.json' : 'polyfill.json')), true);

if (!empty($list) && !$css) {
	$fills = explode(',', preg_replace('/&.*?$/', '', str_replace('..', '.prototype.', $list)));
} else {
	$fills = array();

	$thisAgentString = $_SERVER['HTTP_USER_AGENT'];

	foreach ($agentList as $agent => &$sniffers) {
		foreach($sniffers as $sniffer) {
			$versionBoolean = preg_match('/'.$sniffer.'/', $thisAgentString, $version);

			if ($versionBoolean) {
				$buffer = array();			

				$version = floatval($version[1]);

				foreach ($polyfillList[$agent] as $polyfill) {
					$min = isset($polyfill['only']) ? $polyfill['only'] : (isset($polyfill['min']) ? $polyfill['min'] : -INF);
					$max = isset($polyfill['only']) ? $polyfill['only'] : (isset($polyfill['max']) ? $polyfill['max'] : +INF);

					if ($version >= $min && $version <= $max) {
						if ($css) {
							$buffer = array_merge($buffer, $polyfill['fill']);
						} else {
							$fills = array_merge($fills, explode(' ', $polyfill['fill']));
						}
					}
				}

				if ($css) {
					array_unshift($buffer, '/* '.$agent.' '.$version.' Normalize | MIT License | git.io/normalize */'.($minified ? PHP_EOL : ''));
				} else {
					if (!$minified) {
						array_unshift($buffer, '// '.$agent.' '.$version.' Polyfill'.($minified ? PHP_EOL : ''));
					}
				}

				break 2;
			}
		}
	}
}

foreach ($fills as $fill) {
	$file = $scriptdir.$fill.'.js';

	if (file_exists($file)) {
		$mtime = max($mtime, filemtime($file));

		array_push($buffer, file_get_contents($file));
	}
}

$mtime = gmdate('D, d M Y H:i:s T', $mtime);

header('Cache-Control: public');
header('Content-Type: '.($css ? 'text/css' : ($minified ? 'application/javascript' : 'text/plain')));
header('Last-Modified: '.$mtime, true, 200);

if ($mtime == $_SERVER['HTTP_IF_MODIFIED_SINCE']) {
	header($_SERVER['SERVER_PROTOCOL'].' 304 Not Modified');

	exit();
}

exit(implode($br, $buffer));