<?php

class Polyfill {
	public static function detect($userAgent = null) {
		// get the user agent
		$userAgent = $userAgent ? $userAgent : $_SERVER['HTTP_USER_AGENT'];

		// get the current path
		$path = dirname(__FILE__);

		// load the agent, script, and style objects
		$agentArray = json_decode(file_get_contents($path.'/agent.json'), true);
		$polyfillArray = json_decode(file_get_contents($path.'/polyfill.script.json'), true);
		$polyfillCSSArray = json_decode(file_get_contents($path.'/polyfill.style.json'), true);

		// get the detected object
		$detected = (object) array(
			'script' => array(),
			'style' => array()
		);

		// for each agent object's validator
		foreach ($agentArray as $agent => &$validatorArray) {
			foreach ($validatorArray as $validator) {
				// check whether the user agent matches the agent object's validator
				$hasAgent = preg_match('/'.$validator.'/', $userAgent, $version);

				// if it does
				if ($hasAgent) {
					// get the user agent version
					$version = floatval($version[1]);

					// for each matching agent's script polyfills
					foreach ($polyfillArray[$agent] as $polyfill) {
						// get the polyfill version range
						$min = isset($polyfill['only']) ? $polyfill['only'] : (isset($polyfill['min']) ? $polyfill['min'] : -INF);
						$max = isset($polyfill['only']) ? $polyfill['only'] : (isset($polyfill['max']) ? $polyfill['max'] : +INF);

						// if the user agent version is within that range
						if ($version >= $min && $version <= $max) {
							// add the agent's script polyfills to the detected object
							$detected->script = array_merge($detected->script, explode(' ', $polyfill['fill']));
						}
					}

					// for each matching agent's style polyfills
					foreach ($polyfillCSSArray[$agent] as $polyfill) {
						// get the polyfill version range
						$min = isset($polyfill['only']) ? $polyfill['only'] : (isset($polyfill['min']) ? $polyfill['min'] : -INF);
						$max = isset($polyfill['only']) ? $polyfill['only'] : (isset($polyfill['max']) ? $polyfill['max'] : +INF);

						// if the user agent version is within that range
						if ($version >= $min && $version <= $max) {
							// add the agent's style polyfills to the detected object
							$detected->style = array_merge($detected->style, explode(' ', $polyfill['fill']));
						}
					}

					// stop checking for every agent list's validator 
					break 2;
				}
			}
		}

		// return the detected object
		return $detected;
	}

	public static function script($scripts = null, $minified = true, $filter = false, $all = false) {
		// get the current script path
		$path = dirname(__FILE__).'/'.($minified ? 'minified' : 'source').'/';

		// get the scripts object
		$scripts = isset($scripts) ? $scripts : $all ? glob($path.'*.js') : Polyfill::detect(null, $minified)->script;

		// get the time
		$time = 0;

		// get the type
		$type = $minified ? 'application/javascript' : 'text/plain';

		// get the polyfill array
		$polyfillArray = array();

		// get the string that joins the polyfill array
		$polyfillArrayJoiner = $minified ? '' : PHP_EOL.PHP_EOL;

		// for each scripts object's script
		foreach ($scripts as $script) {
			// get the script file
			$file = $all ? $script : $path.$script.'.js';

			// if the script file exists
			if (file_exists($file) && (!$filter || preg_match($filter, $script))) {
				// get the newest time
				$time = max($time, filemtime($file));

				// add the script contents to the script polyfill array
				array_push($polyfillArray, file_get_contents($file));
			}
		}

		// return the script polyfill
		return (object) array(
			'data' => implode($polyfillArrayJoiner, $polyfillArray),
			'time' => $time,
			'type' => $type
		);
	}

	public static function style($styles = null, $minified = true, $filter = false, $all = false) {
		// get the normalize file
		$file = dirname(__FILE__).'/normalize.json';

		// get the normalize object
		$normalize = json_decode(file_get_contents($file), true);

		// get the scripts object
		$styles = isset($styles) ? $styles : Polyfill::detect(null, $minified)->style;

		// get the time
		$time = filemtime($file);

		// get the type
		$type = 'text/style';

		// get the strings that join the various css blocks
		$cssblockArrayJoiner = $minified ? ',' : ', ';
		$cssblockStart = $minified ? '{' : ' {'.PHP_EOL;
		$cssblockEnd = $minified ? '}' : PHP_EOL.'}';

		// get the rules array
		$rulesArray = array();

		// get the string that joins rules arrays
		$rulesArrayJoiner = $minified ? '' : PHP_EOL.PHP_EOL;

		// for each normalize object's selectors and css block
		foreach ($normalize as $selectors => $cssblock) {
			// get the selectors as an array
			$selectorsArray = explode(' ', $selectors);

			// get the selectors' css block
			$cssblock = $minified ? preg_replace('/: /', ':', $cssblock) : "\t".preg_replace('/;/', ';'.PHP_EOL."\t", $cssblock).';';

			// get the css block array
			$cssblockArray = array();

			if ($all) {
				if ($filter) {
					foreach ($selectorsArray as $selector) {
						if (preg_match($filter, $selector)) {
							array_push($cssblockArray, preg_replace('/^_/', '', $selector));
						}
					}
				} else {
					$cssblockArray = $selectorsArray;
				}
			} else {
				// for each style object's matching selector
				foreach ($styles as $selector) {
					if (in_array($selector, $selectorsArray) && (!$filter || preg_match($filter, $selector))) {
						// add the selectors' css block to the block array
						array_push($cssblockArray, preg_replace('/^_/', '', $selector));
					}
				}
			}

			// if there is anything in the css block array
			if (count($cssblockArray)) {
				// add the matching selector and css block to the rules array
				array_push($rulesArray, implode($cssblockArrayJoiner, $cssblockArray).$cssblockStart.$cssblock.$cssblockEnd);

			}
		}

		// return the style polyfill
		return (object) array(
			'data' => implode($rulesArrayJoiner, $rulesArray),
			'time' => $time,
			'type' => $type
		);
	}

	public static function buffer($polyfill = null, $minified = true, $filter = false, $all = false) {
		// get the polyfill object
		$polyfill = isset($polyfill) ? $polyfill : Polyfill::script(null, $minified, $filter, $all);

		// get time
		$time = gmdate('D, d M Y H:i:s T', $polyfill->time);

		// get headers
		header('Cache-Control: public');
		header('Content-Type: '.$polyfill->type);
		header('Last-Modified: '.$time, true, 200);

		// if the user remembers the file
		if ($time == @$_SERVER['HTTP_IF_MODIFIED_SINCE']) {
			// tell the user to remember it
			header($_SERVER['SERVER_PROTOCOL'].' 304 Not Modified');
		}
		// otherwise
		else {
			// gzip this
			ob_start('ob_gzhandler');

			// print the polyfill
			print($polyfill->data);
		}
	}
}