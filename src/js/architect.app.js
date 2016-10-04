! function ($) {

	'use strict';

	var Architect = {
		Plugins: {},

		ExportPlugin: function (name, plugin) {
			this.Plugins[name] = plugin;
		},

		ExtendDefaults: function (source, properties) {
			var property;
			for (property in properties) {
				if (properties.hasOwnProperty(property)) {
					source[property] = properties[property];
				}
			}
			return source;
		}
	};

	window.Architect = Architect;

}(jQuery);