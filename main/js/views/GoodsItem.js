var App = App || {};

(function () {

	App.Views.GoodsItem = Backbone.View.extend({
	
	tagName: 'tr',
		initialize: function (){
			this.model.on( 'destroy', this.remove, this );
			this.model.on( 'change', this.render, this);
		},
		events: {
			'click .delete' : 'confirmRemove',
			'click .editCount' : 'changeCount',
			'keypress .editUnitsCount': 'updateOnEnter',
			'blur .editUnitsCount': 'close'
		},
		template: _.template( $('#goods-count').html() ),
		render: function () {	
			
			this.model.set('nameGoods', this.options.goodsModel.get('nameG'));
			
			var strTemplate = this.template( this.model.toJSON());
			this.$el.html( strTemplate );
			this.$input = this.$('.editUnitsCount');
			this.$input.val( this.model.get( 'count' ) );

		},
		confirmRemove: function () {
			if ( confirm('Are you sure you want to delete this Goods Item?') ) {
				this.model.destroy();

				App.dbConnector.EditGoodsItems(this.options.goodsModel);
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
			App.Events.trigger('newUnitsCount', this.model, value);
			//App.dbConnector.changeCount( this.options.unitModel );
			App.Events.trigger('newUnitsCount', this.model, value);

			App.dbConnector.EditGoodsItems( this.options.goodsModel );
			this.$el.removeClass('editingCount');
			
		},
		updateOnEnter: function (e) {
			if (e.keyCode == 13) {
				this.close(); 
			}
		},
		
	
	});
	
	App.Views.GoodsItemsList = Backbone.View.extend({  // это вид коллекции
	
	tagName: 'div',
	className:'accordion-body collapse',
		initialize: function () {

			this.collection.on('add', this.addOne, this);
			this.el.id=this.model.get('nameG').replace(" ","");	

		},
		template: _.template( $('#units-table').html() ),
		render: function () {

			
			var strTemplate = this.template( {nameGoods:this.model.get('nameG').replace(" ","")});
			this.$el.html( strTemplate );
			this.collection.each(this.addOne, this);
			return this;
		},
		addOne: function( modelGoodsItem ) {
	
			var goodsItemView = new App.Views.GoodsItem({ model: modelGoodsItem, goodsModel: this.model });
			console.log("render");
			$("#"+this.model.get("nameG").replace(" ","")+"_tableRow").prepend( goodsItemView.el );
			goodsItemView.render();
			$('.buttonPlace').html($('#addUnit2GoodsButton').html());

			
		},
		ItemRemove: function() {
			console.log(this);
			var goodsItemView = new App.Views.GoodsItem({ model: modelGoodsItem, goodsModel: this.model });
			goodsItemView.render();
			this.$el.append( goodsItemView.el );

		},
		ItemRemove: function() {
			console.log(this);
		}
	
	});
	

	

}());