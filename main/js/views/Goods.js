var App = App || {};

(function () {

	App.Views.Goods = Backbone.View.extend({
	
		tagName: 'li',
		initialize: function () {
			this.model.on( 'change', this.render, this);
			this.model.on( 'destroy', this.unitRemoveItem, this );

		},
		
		
	});
	
	App.Views.GoodsList = Backbone.View.extend({  // это вид коллекции
	
		tagName: 'ul',
		
	
	});

}());