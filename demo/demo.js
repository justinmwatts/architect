// Demo js
$(document).ready(function () {

	'use strict';

	// Mobile navigation
	var navMobile = new Architect.Plugins.NavHidden({
		buttonToggleClass: 'js-nav-mobile-button',
		menuClass: 'js-nav-mobile',
		buttonClose: 'js-nav-mobile-close'
	});
	navMobile.init();

	// Sticky docs navigation
	var stickyNavDocs = new Architect.Plugins.StickElement({
		stickyElement: 'js-nav-docs-sticky',
		anchor: 'js-nav-docs-sticky-anchor'
	});
	stickyNavDocs.init();

});