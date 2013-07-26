<?php

/* Polyfill.io
   ========================================================================== */

$fileLastModified = gmdate('D, d M Y H:i:s T', filemtime(__FILE__));
$fileMD5 = md5_file(__FILE__);
$fileDir = dirname(__FILE__).'/';
$isSource = isset($_GET['!']);

$headLastModified = $_SERVER['HTTP_IF_MODIFIED_SINCE'];
$headMD5 = trim($_SERVER['HTTP_IF_NONE_MATCH']);

header('Cache-Control: public');
header('Content-Type: '.($isSource ? 'text/plain' : 'application/javascript'));
header('Etag: '.$fileMD5);
header('Last-Modified: '.$fileLastModified, true, 200);

if ($fileLastModified == $headLastModified || $fileMD5 == $headMD5) {
	header($_SERVER['SERVER_PROTOCOL'].' 304 Not Modified');

	exit();
}

$agentList = json_decode(file_get_contents($fileDir.'agent.json'), true);
$polyfillList = json_decode(file_get_contents($fileDir.'polyfill.json'), true);

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
					$fillList = explode(' ', $polyfill['fill']);

					foreach ($fillList as $fill) {
						$file = $fileDir.($isSource ? 'source/'.$fill.'.js' : 'minified/'.$fill.'.js');

						if (file_exists($file)) {
							array_push($buffer, file_get_contents($file));
						}
					}
				}
			}

			if ($isSource) {
				array_unshift($buffer, '// '.$agent.' '.$version.' Polyfill'.($isSource ? '' : PHP_EOL));
			}

			exit(implode($isSource ? PHP_EOL.PHP_EOL : '', $buffer));
		}
	}
}