var App = App || {};

(function () {

	App.Views.GoodsItem = Backbone.View.extend({
	
	tagName: 'li',
		initialize: function (){
			this.model.on( 'destroy', this.remove, this );
			this.model.on( 'change', this.render, this);
		},
		events: {
			'click .delete' : 'confirmRemove',
			'click .editCount' : 'changeCount',
			'keypress .editGoodsCount': 'updateOnEnter',
			'blur .editGoodsCount': 'close'
		},
		template: _.template( $('#goods-count').html() ),
		render: function () {
			var strTemplate = this.template( this.model.toJSON() );
			this.$el.html( strTemplate );
			this.$input = this.$('.editGoodsCount');
			this.$input.val( this.model.get( 'count' ) );
		},
		confirmRemove: function () {
			if ( confirm('Are you sure you want to delete this Goods Item?') ) {
				this.model.destroy();
				App.dbConnector.EditGoodsItems(this.options.goodsModel);
				//App.dbConnector.EditGoodsItem( this.options.goodsModel );
			}	
		},
		remove: function () {
			this.$el.remove();
		
		},
		changeCount: function () {
			this.$el.addClass('editingCount');
			this.$input.focus();
			
		},
		close: function () {
			var value = this.$input.val().trim();
			 if ( isNaN ( value )  || value <0 || value == '') {
				this.$el.removeClass('editingCount');
				this.render();
				return;
			}	
			App.Events.trigger('newMaterialCount', this.model, value);
			App.dbConnector.editGoodsItems( this.options.goodsModel );
			this.$el.removeClass('editingCount');
			
		},
		updateOnEnter: function (e) {
			if (e.keyCode == 13) {
				this.close(); 
			}
		},
		
	
	});
	
	App.Views.GoodsItemsList = Backbone.View.extend({  // это вид коллекции
	
	tagName: 'ul',
		initialize: function () {
			this.collection.on('add', this.addOne, this);
		},
		render: function () {
			this.collection.each(this.addOne, this);
			return this;
		},
		addOne: function( modelGoodsItem ) {
	
			var goodsItemView = new App.Views.GoodsItem({ model: modelGoodsItem, goodsModel: this.model });
			goodsItemView.render();
			this.$el.append( goodsItemView.el );
		},
		ItemRemove: function() {
			console.log(this);
		}
	
	});
	

	

}());