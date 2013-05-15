var App = App || {};

(function () {	

	App.Views.AddUnitsList = Backbone.View.extend({
	
		tagName: 'ul',
		initialize: function () {
			this.collection.on('add', this.addOne, this);
			this.model.on('change', this.saveUnitCollection, this);
		},
		render: function () {
			this.collection.each(this.addOne, this);
			return this;
		},
		addOne: function(modelUnits) {
			var UnitsCollection = this.model.get ( 'goodsCollection' );
			var UnitView = new App.Views.UnitPlus({ model: modelUnits, collection: UnitsCollection, something: this.model });

			UnitView.render();
			this.$el.append( UnitView.el );
			
		},
		saveUnitCollection: function () {
			App.dbConnector.EditUnitItem ( this.model );
			console.log('App.dbConnector.EditUnitItem triggered!');
		
		}
	
	});
	
	App.Views.UnitPlus = Backbone.View.extend({ // это вид модели
		tagName: 'li',
		initialize: function () {
			//this.model.on('change:material', this.render, this);
			//this.model.on('change:price', this.render, this);
			this.collection.on('add', this.saveUnitCollection, this);
			this.model.on( 'plus', this.plus, this );
		},
		events: {
			'click .icon-plus' : 'confirmQuantity'
		},
		template: _.template( $('#goods-count-plus').html() ),
		render: function () {
			var strTemplate = this.template( this.model.toJSON() );
			this.$el.html( strTemplate );
		},
		confirmQuantity: function () {
			var quantity = prompt( 'Please enter the quantity2 of ' + this.model.get ( 'name' ),1  );
			if ( quantity !== null ) {
				var clearQuantity = quantity.replace(/\s/g, ""); // delete all spaces
				if ( ( clearQuantity !== '' ) && ( clearQuantity !== null ) && ( !isNaN(clearQuantity) ) ) {

					newModel = new App.Models.GoodsItem({units:this.model.get ( 'name' ), count:clearQuantity, goodsItemPrice: this.model.get('unitPrice')*clearQuantity})
					this.collection.add (newModel);
					this.options.something.set("goodsPrice", this.options.something.get("goodsPrice")+newModel.get('goodsItemPrice') );
					this.options.something.set("goodsCollection", this.collection);

					App.dbConnector.EditGoodsItems(this.options.something);
				}
				else{
					this.confirmQuantity();
				}

			} else {
				return false;
			}
		},
		saveUnitCollection: function () {
		
			//App.dbConnector.EditUnitItem (this.options.something);
			console.log('App.dbConnector.EditUnitItem triggered!');
		},
		
		
		plus: function () {
		
		
		
		}
	});
	
}());