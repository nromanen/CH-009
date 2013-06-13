define([
	'jquery',
	'underscore',
	'backbone',
	'app',
	'text!../templates/orderItem.html'

], function($, _, Backbone, App,
	orderItemTemplate) {

	var Material = Backbone.View.extend({ // это вид модели
		tagName: 'tr',
		initialize: function () {

		},
		events: {

		},
		render: function () {
			var Template = _.template( orderItemTemplate, this.model.toJSON() );
			this.$el.html( Template );
		},
	});

	return Material;

});