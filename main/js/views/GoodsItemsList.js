define([
	'jquery',
	'underscore',
	'backbone',
	'app',
	'goodsItemView',
	'goodsItemModel',
	'text!../templates/goodsItemsListCustomer.html',
	'text!../templates/goodsItemsListEngineer.html',
	'text!../templates/addUnit2GoodsButton.html'

], function(
	$,
	_,
	Backbone,
	App,
	goodsItemView,
	goodsItemModel,
	goodsItemsListCustomerTemplate,
	goodsItemsListEngineerTemplate,
	addUnit2GoodsButtonTemplate
	) {

	var GoodsItemsList = Backbone.View.extend({  // это вид коллекции

	tagName: 'div',
	className:'accordion-body collapse',
		initialize: function () {
			this.collection.off('add');
			this.collection.on('add', this.addOne, this);
			this.el.id = this.model.cid;
		},
		render: function () {
			if ( App.userRole === 'customer' ) {
				var strTemplate = _.template( goodsItemsListCustomerTemplate, { nameGoods:this.model.cid, goodsPrice : this.model.get('goodsPrice') } );
			} else {
				var strTemplate = _.template( goodsItemsListEngineerTemplate, { nameGoods:this.model.cid, goodsPrice : this.model.get('goodsPrice') } );
			}

			this.$el.html( strTemplate );
			this.collection.each(this.addOne, this);

			if ( App.userRole !== 'customer' ) {
				$('.buttonPlace').html( addUnit2GoodsButtonTemplate );
			}
			//console.log("render goodsList");
			return this;
		},
		addOne: function( modelGoodsItem ) {

			var goodsItemViewInstance = new goodsItemView({ model: modelGoodsItem, goodsModel: this.model });
			$("#"+this.model.cid+"_tableRow").prepend( goodsItemViewInstance.el );
			goodsItemViewInstance.render();

			if ( App.userRole !== 'customer' ) {
				$('.buttonPlace').html( addUnit2GoodsButtonTemplate );
			}

		},
		ItemRemove: function() {
			var goodsItemViewInstance = new goodsItemView({ model: modelGoodsItem, goodsModel: this.model });
			goodsItemViewInstance.render();
			this.$el.append( goodsItemViewInstance.el );
		},
		ItemRemove: function() {
			console.log(this);
		}

	});

	return GoodsItemsList;

});