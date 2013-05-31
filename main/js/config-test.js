requirejs.config({
	paths: {
		jquery : 'libs/jquery-min',
		underscore: 'libs/underscore',
		backbone: 'libs/backbone-min',
		text: 'libs/text'
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

define(['init-test'], function (initialize) {
	console.log('test');
	initialize();
});


