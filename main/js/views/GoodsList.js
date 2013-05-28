var App = App || {};

(function () {

	App.Views.GoodsList = Backbone.View.extend({  // это вид коллекции
		
		tagName: 'div',

		initialize: function () {
			this.collection.on('add', this.render, this);
			this.render();
		},
		render: function () {
			
			$('#products').append( this.el );	
            this.$el.html('');
          	this.collection.each( this.addOne, this );
			return this;
			
		},
		addOne: function( modelGoods ) {
			
			var GoodsView = new App.Views.Goods({ model: modelGoods });
			this.$el.prepend( GoodsView.el );
			
			GoodsView.render();
			
			var jq_goods_info = '.goods_info';
			this.$el.find( jq_goods_info ).hide();

		}
			
		
	});

})();