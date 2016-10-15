'use strict';

! function () {

	var StickElement = function () {
		// Default options
		var defaults = {
			stickyElement: 'js-sticky-element',
			anchor: 'js-sticky-element-anchor',
		};

		// Create options
		if (arguments[0] && typeof arguments[0] === 'object') {
			this.options = Architect.ExtendDefaults(defaults, arguments[0]);
		}
		else {
			this.options = defaults;
		}
	};

	StickElement.prototype.init = function () {
		var anchor = document.getElementsByClassName(this.options.anchor)[0];
		var stickyElement = document.getElementsByClassName(this.options.stickyElement)[0];

		// Set sticky elements position
		setStickyElementsPosition();

		// Update sticky elements position on scroll and resize
		window.addEventListener('scroll', setStickyElementsPosition, false);
		window.addEventListener('resize', setStickyElementsPosition, false);

		// Set sticky elements position
		function setStickyElementsPosition() {
			var elementTop = getAnchorsTopPosition(anchor);

			if (elementTop <= 0) {;
				stickyElement.style.position = 'fixed';
			}
			else {
				stickyElement.style.position = 'relative';
			}
		}

		// Get anchor's top position
		function getAnchorsTopPosition(element) {
			var topPosition = 0;

			// Get elements distance from top of the page.
			// Loop through parent elements until we get to the BODY element.
			while (element) {
				if (element.tagName == 'BODY') {
					// BODY element
					// Browser quirks for BODY and page scroll
					var scrollY = element.scrollTop || document.documentElement.scrollTop;
					topPosition += (element.offsetTop - scrollY + element.clientTop);
				}
				else {
					// Non-BODY elements
					topPosition += (element.offsetTop - element.scrollTop + element.clientTop);
				}
				element = element.offsetParent;
			}

			return topPosition;
		}
	};

	// Export
	Architect.ExportPlugin('StickElement', StickElement);

}();