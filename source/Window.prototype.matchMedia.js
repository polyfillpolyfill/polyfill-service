// Window.prototype.matchMedia
(function () {
	function evalQuery(window, query) {
		return new Function('media', 'try{ return !!(%s) }catch(e){ return false }'
			.replace('%s', query||'true')
			.replace(/^only\s+/, '')
			.replace(/(device)-([\w.]+)/g, '$1.$2')
			.replace(/([\w.]+)\s*:/g, 'media.$1 ===')
			.replace(/min-([\w.]+)\s*===/g, '$1 >=')
			.replace(/max-([\w.]+)\s*===/g, '$1 <=')
			.replace(/all|screen/g, '1')
			.replace(/print/g, '0')
			.replace(/,/g, '||')
			.replace(/and/g, '&&')
			.replace(/dpi/g, '')
			.replace(/(\d+)(cm|em|in|mm|pc|pt|px|rem)/, function ($0, $1, $2) {
				return $1 * (
					$2 === 'cm' ? 0.3937 * 96 : (
						$2 === 'em' || $2 === 'rem' ? 16 : (
							$2 === 'in' ? 96 : (
								$2 === 'mm' ? 0.3937 * 96 / 10 : (
									$2 === 'pc' ? 12 * 96 / 72 : (
										$2 === 'pt' ? 96 / 72 : 1
									)
								)
							)
						)
					)
				);
			})
		)({
			width: window.innerWidth,
			height: window.innerHeight,
			orientation: window.orientation || 'landscape',
			device: {
				width: window.screen.width,
				height: window.screen.height,
				orientation: window.screen.orientation || window.orientation || 'landscape'
			}
		});
	}

	function MediaQueryList() {
		this.matches = false;
		this.media = 'invalid';
	}

	MediaQueryList.prototype.addListener = function addListener(listener) {
		this.addListener.listeners.push(listener);
	};

	MediaQueryList.prototype.removeListener = function removeListener(listener) {
		this.addListener.listeners.splice(this.addListener.listeners.indexof(listener), 1);
	};

	window.matchMedia = Window.prototype.matchMedia = function matchMedia(query) {
		var
		window = this,
		list = new MediaQueryList();

		if (0===arguments.length) {
			throw new TypeError('Not enough arguments to window.matchMedia');
		}

		list.media = String(query);
		list.matches = evalQuery(window, list.media);
		list.addListener.listeners = [];

		window.addEventListener('resize', function () {
			var listeners = [].concat(list.addListener.listeners), matches = evalQuery(window, list.media);

			if (matches != list.matches) {
				list.matches = matches;
				for (var index = 0, length = listeners.length; index < length; ++index) {
					listeners[index].call(window, list);
				}
			}
		});

		return list;
	};
})();
