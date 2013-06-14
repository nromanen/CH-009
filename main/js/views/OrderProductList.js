define([
	'jquery',
	'underscore',
	'backbone',
	'orderProductView',
	'text!../templates/orderProductList.html'

], function($, _, Backbone, orderProductView, orderProductListTemplate) {

	var OrderProductList = Backbone.View.extend({  // это вид коллекции
	
		tagName: 'div',
		initialize: function () {
			
			this.el.id = this.model.get( 'id' )+'order';
		},
		className: 'accordion-body collapse',
		template: _.template( orderProductListTemplate ),
		render: function () {

			var strTemplate = this.template( this.model.toJSON() );

			this.$el.html ( strTemplate  );
			this.collection.each(this.addOne, this);
			return this;
			
		},
		addOne: function( modelProductItem ) {
			var orderProductInstance = new orderProductView({ model: modelProductItem});
			orderProductInstance.render();
			this.$el.find('.table').append( orderProductInstance.el );
		}
	
	});

	return OrderProductList;

});