! function ($) {

	'use strict';

	var NavHidden = function () {
		// Default options
		var defaults = {
			buttonToggleClass: 'js-nav-hidden-button',
			menuClass: 'js-nav-hidden-menu',
			buttonClose: 'js-nav-hidden-close',
			activeClass: 'is-active'
		};

		// Create options
		if (arguments[0] && typeof arguments[0] === 'object') {
			this.options = Architect.ExtendDefaults(defaults, arguments[0]);
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

		$('body').on('click', buttonToggle, function (e) {
			e.preventDefault();

			$(buttonToggle).toggleClass(activeClass);
			$(menu).toggleClass(activeClass);
		});

		$('body').on('click', close, function () {
			$(buttonToggle).removeClass(activeClass);
			$(menu).removeClass(activeClass);
		});
	};

	// Export
	Architect.ExportPlugin('NavHidden', NavHidden);

}(jQuery);