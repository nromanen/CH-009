define([
	'jquery',
	'underscore',
	'backbone',
	'app',
	'orderItemView',
	'text!../templates/orderList.html'

], function($, _, Backbone, App, orderItemView, orderListTemplate) {

	var List = Backbone.View.extend({ 
	
		tagName: 'table',
		className: 'table',
		initialize: function () {
			this.collection.on('add', this.addOne, this);
		},
		render: function () {
			this.$el.append( orderListTemplate );
			this.collection.each(this.addOne, this);
			return this;
		},
		addOne: function( modelOrder ) {
			var orderView = new orderItemView({ model: modelOrder });
			orderView.render();
			this.$el.append( orderView.el );
		}
	
	});

	return List;

});