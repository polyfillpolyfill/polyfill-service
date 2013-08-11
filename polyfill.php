<?php

class Polyfill {
	/**
	 * Returns the required polyfills for a user agent
	 *
	 * @param {String} [type] The polyfill type to detect (optional)
	 * @param {String} [useragent] The user agent to detect (optional)
	 * @return {String} [filter] The matching filter for any polyfill
	 * @return {Array} The polyfills for the user agent
	 */
	public static function detect($type = 'js', $useragent = 'all', $filter = null) {
		// the current path
		$path = dirname(__FILE__);

		// the agents and polyfills
		$agents = json_decode(file_get_contents($path.'/agent.json'), true);
		$agentsFills = json_decode(file_get_contents($path.'/agent.'.$type.'.json'), true);

		// the required array
		$required = array();

		// if the useragent is all
		if ($useragent === 'all') {
			// require every JavaScript polyfill matching any filter
			if ($type === 'js') {
				foreach (glob($path.'/source/*.js') as $file) {
					$fill = substr(basename($file), 0, -3);

					if (!$filter || preg_match($filter, $fill)) {
						array_push($required, $fill);
					}
				}
			}

			// require every CSS polyfill matching any filter
			if ($type === 'css') {
				$normalize = json_decode(file_get_contents($path.'/normalize.json'), true);

				foreach ($normalize as $selectors => $cssblock) {
					$selectors = explode(' ', $selectors);

					foreach ($selectors as $selector) {
						if (!in_array($selector, $required) && (!$filter || preg_match($filter, $selector))) {
							array_push($required, $selector);
						}
					}
				}
			}

			return $required;
		} else {
			// for each agent validator
			foreach ($agents as $agent => &$validators) {
				foreach ($validators as $validator) {
					// if the user agent matches the validator
					if (preg_match('/'.$validator.'/', $useragent, $version)) {
						// the user agent version
						$version = floatval($version[1]);

						// for each agent polyfill
						foreach ($agentsFills[$agent] as $fills) {
							// the polyfill version range
							$min = isset($fills['only']) ? $fills['only'] : (isset($fills['min']) ? $fills['min'] : -INF);
							$max = isset($fills['only']) ? $fills['only'] : (isset($fills['max']) ? $fills['max'] : +INF);

							// if the user agent version is within the polyfill version range
							if ($version >= $min && $version <= $max) {
								// require the polyfills matching any filter
								$fills['fill'] = is_array($fills['fill']) ? $fills['fill'] : explode(' ', $fills['fill']);

								foreach ($fills['fill'] as $fill) {
									if (!$filter || preg_match($filter, $fill)) {
										array_push($required, $fill);
									}
								}
							}
						}

						// stop checking agent validators
						break 2;
					}
				}
			}
		}

		// return the required array
		return $required;
	}

	/**
	 * Returns the rendered polyfills
	 *
	 * @param {Array} [required] The polyfills to render
	 * @param {String} [type] The polyfill rendering method
	 * @param {String} [minified] Whether the rendered polyfills should be minified
	 * @return {Object} The polyfill
	 */
	public static function render($required = null, $type = 'js', $minified = true) {
		// if JavaScript
		if ($type === 'js') {
			// the current script path
			$path = dirname(__FILE__).'/'.($minified ? 'minified' : 'source').'/';

			// the time
			$time = 0;

			// the type
			$type = $minified ? 'application/javascript' : 'text/plain';

			// the render array
			$render = array();

			// for each required file
			foreach ($required as $require) {
				$file = $path.$require.'.js';

				// if the file exists
				if (file_exists($file)) {
					// the newest time
					$time = max($time, filemtime($file));

					// add the contents to the render array
					array_push($render, file_get_contents($file));
				}
			}

			$data = implode($minified ? '' : PHP_EOL.PHP_EOL, $render);
		}

		if ($type === 'css') {
			// the normalize file
			$file = dirname(__FILE__).'/normalize.json';

			// the time
			$time = filemtime($file);

			// the type
			$type = 'text/style';

			// the normalize object
			$normalize = json_decode(file_get_contents($file), true);

			// the rules array
			$rulesArray = array();

			// for each normalize object's selectors and css block
			foreach ($normalize as $selectors => $cssblock) {
				// the selectors as an array
				$selectors = explode(' ', $selectors);

				// the selectors' css block
				$cssblock = $minified ? preg_replace('/: /', ':', $cssblock) : "\t".preg_replace('/;/', ';'.PHP_EOL."\t", $cssblock).';';

				// the css block array
				$cssblockArray = array();

				// for each style object's matching selector
				foreach ($required as $selector) {
					if (in_array($selector, $selectors)) {
						// add the selectors' css block to the block array
						array_push($cssblockArray, preg_replace('/^_/', '', $selector));
					}
				}

				// if there is anything in the css block array
				if (count($cssblockArray)) {
					// add the matching selector and css block to the rules array
					array_push($rulesArray, implode($minified ? ',' : ', ', $cssblockArray).($minified ? '{' : ' {'.PHP_EOL).$cssblock.($minified ? '}' : PHP_EOL.'}'));
				}
			}

			$data = implode($minified ? '' : PHP_EOL.PHP_EOL, $rulesArray);
		}

		// return the polyfill
		return (object) array(
			'data' => $data,
			'time' => $time,
			'type' => $type
		);
	}

	/**
	 * Renders the polyfills
	 *
	 * @param {Array} [polyfill] The polyfill to render
	 */
	public static function buffer($polyfill = null) {
		// the time
		$time = gmdate('D, d M Y H:i:s T', $polyfill->time);

		// the headers
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