var App = App || {};

(function () {

	App.Views.GoodsItemsList = Backbone.View.extend({  // это вид коллекции
	
	tagName: 'div',
	className:'accordion-body collapse',
		initialize: function () {
			this.collection.off('add');
			this.collection.on('add', this.addOne, this);
			this.el.id = this.model.cid;	
		},
		render: function () {
			if ( App.userRole === 'customer' ) {
				var strTemplate = _.template( $('#units-table-customer').html(), { nameGoods:this.model.cid, goodsPrice : this.model.get('goodsPrice') } );	
			} else {
				var strTemplate = _.template( $('#units-table').html(), { nameGoods:this.model.cid, goodsPrice : this.model.get('goodsPrice') } );	
			}
			
			this.$el.html( strTemplate );
			this.collection.each(this.addOne, this);

			if ( App.userRole !== 'customer' ) {
				$('.buttonPlace').html( $('#addUnit2GoodsButton').html() );
			}

			return this;
		},
		addOne: function( modelGoodsItem ) {
	
			var goodsItemView = new App.Views.GoodsItem({ model: modelGoodsItem, goodsModel: this.model });
			$("#"+this.model.cid+"_tableRow").prepend( goodsItemView.el );
			
			goodsItemView.render();
			
			if ( App.userRole !== 'customer' ) {
				$('.buttonPlace').html( $('#addUnit2GoodsButton').html() );
			}

		},
		ItemRemove: function() {
			var goodsItemView = new App.Views.GoodsItem({ model: modelGoodsItem, goodsModel: this.model });
			goodsItemView.render();
			this.$el.append( goodsItemView.el );
		},
		ItemRemove: function() {
			console.log(this);
		}
	
	});

})();