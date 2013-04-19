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
<<<<<<< HEAD
			'dblclick .count' : 'changeCount',
=======
>>>>>>> 03d88b1f511bdddd667987cb30a0c76ad7f65699
			'keypress .editUnitsCount': 'updateOnEnter',
			'blur .editUnitsCount': 'close'
		},
		template: _.template( $('#goods-count').html() ),
		render: function () {
		
			var strTemplate = this.template( this.model.toJSON() );
			this.$el.html( strTemplate );
			this.$input = this.$('.editUnitsCount');
			this.$input.val( this.model.get( 'count' ) );
		
		},
		confirmRemove: function () {
			
			if ( confirm('Are you sure you want to delete this Goods Item?') ) {
				this.model.destroy();
<<<<<<< HEAD
=======
				App.dbConnector.EditGoodsItems(this.options.goodsModel);
>>>>>>> 03d88b1f511bdddd667987cb30a0c76ad7f65699
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
			 if ( isNaN ( value )  || value < 0 || value == '') {
				this.$el.removeClass('editingCount');
				this.render();
				return;
			}	
<<<<<<< HEAD
			
			App.Events.trigger('newUnitsCount', this.model, value);
			//App.dbConnector.changeCount( this.options.unitModel );
=======
			App.Events.trigger('newUnitsCount', this.model, value);
			App.dbConnector.EditGoodsItems( this.options.goodsModel );
>>>>>>> 03d88b1f511bdddd667987cb30a0c76ad7f65699
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
<<<<<<< HEAD
			
=======
>>>>>>> 03d88b1f511bdddd667987cb30a0c76ad7f65699
		},
		render: function () {
			this.collection.each(this.addOne, this);
			return this;
		},
		addOne: function( modelGoodsItem ) {
	
<<<<<<< HEAD
			var goodsItemView = new App.Views.GoodsItem({ model: modelGoodsItem, goodsModel: this.model  });

			goodsItemView.render();
			this.$el.append( goodsItemView.el );
			console.log( this.model.toJSON() );
=======
			var goodsItemView = new App.Views.GoodsItem({ model: modelGoodsItem, goodsModel: this.model });
			goodsItemView.render();
			this.$el.append( goodsItemView.el );
		},
		ItemRemove: function() {
			console.log(this);
>>>>>>> 03d88b1f511bdddd667987cb30a0c76ad7f65699
		}
	
	});
	

	

}());