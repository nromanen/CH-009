define([
	'jquery',
	'underscore',
	'backbone',
	'app',
	'orderProductListView',
	'text!../templates/orderList.html'

], function(
	$,
	_,
	Backbone,
	App,
	orderProductListView,
	orderListTemplate
	) {

	var OrderItem = Backbone.View.extend({

		tagName: 'div',
		className: 'accordion-group',
		initialize: function () {

		},
		events: {
			'click .customerName' : 'unitToggle',
		},
		template: _.template( orderListTemplate ),

		render: function () {
			var strTemplate = this.template( this.model.toJSON() );
			this.$el.html( strTemplate );
			var newBasketProductsView = new orderProductListView( { collection: this.model.get( 'order' ), model: this.model  } ) ;
			newBasketProductsView.render();

			this.$el.append( newBasketProductsView.el );
		},
		unitToggle: function () {

				this.$(".collapse").collapse();
		}
	});

	return OrderItem;

});