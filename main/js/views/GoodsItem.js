define([
	'jquery',
	'underscore',
	'backbone',
	'app'

], function($, _, Backbone, App) {

	var GoodsItem = Backbone.View.extend({
	
	tagName: 'tr',
		initialize: function (){
			this.model.on( 'destroy', this.remove, this );

			this.model.on( 'change', this.refresh, this);
		},
		events: {
			'click .delete' : 'confirmRemove',
			'click .edit' : 'changeCount',
			'keypress .edit_units_count': 'updateOnEnter',
			'blur .edit_units_count': 'close'
		},
		render: function () {	
			
			this.model.set('nameGoods', this.options.goodsModel.cid);
			this.model.set('nameGoods', this.options.goodsModel.get('nameG'));

			if ( App.userRole === 'customer' ) {
				var strTemplate = _.template( $('#goods-count-customer').html(), this.model.toJSON() );
			} else {
				var strTemplate = _.template( $('#goods-count').html(), this.model.toJSON() );
			}

			this.$el.html( strTemplate );
			this.$input = this.$('.edit_units_count');
			this.$input.val( this.model.get( 'count' ) );

		},
		refresh: function () {
			this.$el.find('.count').html(this.model.get('count'));
			this.$el.find('.goodsItemPrice').html('$'+this.model.get('goodsItemPrice'));
		},
		confirmRemove: function () {
			if ( confirm('Are you sure you want to delete this Goods Item?') ) {
				this.options.goodsModel.set('goodsPrice', this.options.goodsModel.get('goodsPrice')-this.model.get('goodsItemPrice'));		
				this.model.destroy();
				App.dbConnector.EditGoodsItems(this.options.goodsModel);
			}	
		},
		remove: function () {
			this.$el.remove();
		},
		changeCount: function () {
			this.$el.addClass('editing');
			this.$input.focus();
		},
		close: function () {
			var value = this.$input.val().trim();
			 if ( isNaN ( value )  || value <0 || value == '' || value.length > 5) {
				this.$el.removeClass('editing');
				this.render();
				return;
			}	
			this.options.goodsModel.set('goodsPrice', this.options.goodsModel.get('goodsPrice')-this.model.get('goodsItemPrice'));
			App.Events.trigger('newUnitsCount', this.model, value);
			this.options.goodsModel.set('goodsPrice', this.options.goodsModel.get('goodsPrice')+this.model.get('goodsItemPrice'));
			App.dbConnector.EditGoodsItems( this.options.goodsModel );
			this.$el.removeClass('editing');
			this.$el.find(".count").html(value);
			this.$el.find(".total").html(this.model.get('goodsItemPrice'))
		},
		updateOnEnter: function (e) {
			if (e.keyCode == 13) {
				this.close(); 
			}
		},
		
	
	});	

	return GoodsItem;

});