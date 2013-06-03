define([
	'underscore',
	'backbone'
], function(_, Backbone) {

	var App = new Array;
	var App = {

		Models : new Array,
		Views : new Array,
		Events : _.extend({}, Backbone.Events),
		Collections : new Array,
		dbConnector : new Array,
		Router : new Array,
		State : new Array,
		StateMachine : new Array

	}

  	return App;

});