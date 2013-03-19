<?php

/* Polyfill.io
   ========================================================================== */

header('Content-Type: application/javascript');

$agentList = json_decode(file_get_contents('agent.json'), true);
$polyfillList = json_decode(file_get_contents('polyfill.json'), true);

$thisAgentString = $_SERVER['HTTP_USER_AGENT'];

foreach ($agentList as $agentString => &$agentArray) {
	$agentBoolean = preg_match($agentArray['browser'], $thisAgentString, $agentMatches);

	if ($agentBoolean) {
		$buffer = array();

		foreach ($agentArray['version'] as $versionString) {
			$versionBoolean = preg_match($versionString, $thisAgentString, $versionMatches);

			$versionString = $versionBoolean ? intval($versionMatches[1]) : 0;

			foreach ($polyfillList[$agentString] as $polyfillArray) {
				$min = isset($polyfillArray['only']) ? $polyfillArray['only'] : isset($polyfillArray['min']) ? $polyfillArray['min'] : -INF;
				$max = isset($polyfillArray['only']) ? $polyfillArray['only'] : isset($polyfillArray['max']) ? $polyfillArray['max'] : +INF;

				if ($versionString >= $min && $versionString <= $max) {
					$fillList = explode(' ', $polyfillArray['fill']);

					foreach ($fillList as $fillString) {
						if (file_exists('source/' . $fillString . '.js')) {
							array_push($buffer, file_get_contents('source/' . $fillString . '.js'));
						}
					}
				}
			}
		}

		array_unshift($buffer, '// '.$agentString.' '.$versionString.' polyfill', 'this.vendorPrefix = "'.$agentArray['prefix'].'";');

		exit(implode("\n\n", $buffer));
	}
}