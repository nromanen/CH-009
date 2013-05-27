var App = App || {};

(function () {

	App.Views.Basket =  Backbone.View.extend({

		tagName:'div',

		initialize: function (){


			this.collection.off('add');
			this.collection.on('add', this.addOne, this);
			this.render()

		},

		render: function (){
			this.$el.html('');
          	this.collection.each( this.addOne, this );
			return this;


		},
		addOne: function(modelItems){
			
			var basketItems =  new App.Views.BasketItems({model:modelItems});
			this.$el.prepend( basketItems.el );
			basketItems.render();

		}


	});
})();