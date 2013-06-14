define([
	'jquery',
	'underscore',
	'backbone',
	'app',
	'orderItemView',

], function($, _, Backbone, App, orderItemView) {

	var OrderItemList = Backbone.View.extend({ 
	
		tagName: 'div',
		className: 'accordion',
		initialize: function () {

		},
		render: function () {
			$('#orders').append(this.el);
			this.$el.html('');
			this.collection.each(this.addOne, this);
			return this;
		},
		addOne: function( modelOrder ) {
			var orderView = new orderItemView({ model: modelOrder, collection: modelOrder.order });
			orderView.render();
			this.$el.append( orderView.el );

		}
	
	});

	return OrderItemList;

});