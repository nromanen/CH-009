requirejs.config({
	paths: {
		jquery : 'lib/jquery-min',
		underscore: 'lib/underscore',
		backbone: 'lib/backbone-min',
		text: 'libs/text',
		model: 'models/model',
		view: 'views/view'
	},
	shim : {
		jquery : {
			deps : [],
			exports: '$'
		},
		underscore : {
			deps: [],
			exports: '_'
		},
		backbone : {
			deps: ['jquery', 'underscore'],
			exports: 'Backbone'
		}
	}
})

define(['init'], function (initialize) {
	initialize();
});