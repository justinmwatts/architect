'use strict';

(function ($) {
	$(document).on('ready', function () {

		// Nav Toggle
		function navToggle(e) {
			e.preventDefault();

			var activeClass = 'is-active';
			var navbarToggleClass = '.js-navbar-toggle';

			if ($(navbarToggleClass).hasClass(activeClass) === true) {
				$(navbarToggleClass).removeClass(activeClass);
			}
			else {
				$(navbarToggleClass).addClass(activeClass);
			}
		}

		$('.js-navbar-toggle').on('click', navToggle);

	});
})(jQuery);