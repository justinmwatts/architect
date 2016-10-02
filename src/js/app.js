// 'use strict';

// hidden nav
! function ($) {
	this.NavHidden = function () {
		// Default options
		var defaults = {
			buttonToggleClass: 'js-nav-hidden-button',
			menuClass: 'js-nav-hidden-menu',
			buttonClose: 'js-nav-hidden-close',
			activeClass: 'is-active'
		};

		// Create options
		if (arguments[0] && typeof arguments[0] === 'object') {
			this.options = Architect.utilities.extendDefaults(defaults, arguments[0]);
		}
		else {
			this.options = defaults;
		}
	};

	NavHidden.prototype.init = function () {
		var buttonToggle = '.' + this.options.buttonToggleClass;
		var menu = '.' + this.options.menuClass;
		var close = '.' + this.options.buttonClose;
		var activeClass = this.options.activeClass;

		$('body').on('click', buttonToggle, function () {
			$(buttonToggle).toggleClass(activeClass);
			$(menu).toggleClass(activeClass);
		});

		$('body').on('click', close, function () {
			$(buttonToggle).removeClass(activeClass);
			$(menu).removeClass(activeClass);
		});

	};
}(jQuery);


// sticky element
! function ($) {

	this.StickElement = function () {
		// Default options
		var defaults = {
			stickyElement: 'js-sticky-element',
			anchor: 'js-sticky-element-anchor',
		};

		// Create options
		if (arguments[0] && typeof arguments[0] === 'object') {
			this.options = Architect.utilities.extendDefaults(defaults, arguments[0]);
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

}(jQuery);



// Core
! function ($) {
	var Architect = {

		// Ultilities
		utilities: {

			extendDefaults: function (source, properties) {
				var property;
				for (property in properties) {
					if (properties.hasOwnProperty(property)) {
						source[property] = properties[property];
					}
				}
				return source;
			}

		}

	};

	window.Architect = Architect;
}(jQuery);



$(document).ready(function () {

	// Mobile navigation
	var navMobile = new NavHidden({
		buttonToggleClass: 'js-nav-mobile-button',
		menuClass: 'js-nav-mobile',
		buttonClose: 'js-nav-mobile-close'
	});
	navMobile.init();

	// Sticky docs navigation
	var stickyNavDocs = new StickElement({
		stickyElement: 'js-nav-docs-sticky',
		anchor: 'js-nav-docs-sticky-anchor'
	});
	stickyNavDocs.init();

});



// var exports = {};
// exports.navToggle = function () {}
// return exports;