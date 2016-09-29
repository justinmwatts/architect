// 'use strict';

! function ($) {
	this.NavHidden = function () {
		// Default options
		var defaults = {
			buttonDataAttribute: 'data-hidden-nav-button',
			menuDataAttribute: 'data-hidden-nav-menu',
			activeClass: 'is-active',
			direction: 'right'
		}

		// Create options
		if (arguments[0] && typeof arguments[0] === "object") {
			this.options = Architect.utilities.extendDefaults(defaults, arguments[0]);
		}
		else {
			this.options = defaults;
		}

		// Format the data attribute hooks
		this.options.buttonDataAttribute = '[' + this.options.buttonDataAttribute + ']';
		this.options.menuDataAttribute = '[' + this.options.menuDataAttribute + ']';
	}

	NavHidden.prototype.toggle = function () {
		var button = this.options.buttonDataAttribute;
		var activeClass = this.options.activeClass;
		var menu = this.options.menuDataAttribute;

		$('body').on('click', button, function () {
			$(button).toggleClass(activeClass);
			$(menu).toggleClass(activeClass);
		});
	}

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

	var mobileNav = new NavHidden({
		buttonDataAttribute: 'data-mobile-nav-close',
		menuDataAttribute: 'data-nav-menu'
	});
	mobileNav.toggle();

});



// var exports = {};
// exports.navToggle = function () {}
// return exports;