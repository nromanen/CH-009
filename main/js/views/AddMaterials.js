var App = App || {};

(function () {	

	App.Views.AddMaterialsList = Backbone.View.extend({
	
		tagName: 'ul',
		initialize: function () {
			this.collection.on('add', this.addOne, this);
			this.model.on('change', this.saveUnitCollection, this);
		},
		render: function () {
			this.collection.each(this.addOne, this);
			return this;
		},
		addOne: function(modelMaterial) {
			var MaterialsCollection = this.model.get ( 'mcollection' );
			var MaterialView = new App.Views.MaterialPlus({ model: modelMaterial, collection: MaterialsCollection, something: this.model });
			//console.log( JSON.stringify( MaterialsCollection.where({price: "500"}) ) );
			MaterialView.render();
			this.$el.append( MaterialView.el );
			
		},
		saveUnitCollection: function () {
			App.dbConnector.EditUnitItem ( this.model );
			console.log('App.dbConnector.EditUnitItem triggered!');
		
		}
	
	});
	
	App.Views.MaterialPlus = Backbone.View.extend({ // это вид модели
		tagName: 'li',
		initialize: function () {
			//this.model.on('change:material', this.render, this);
			//this.model.on('change:price', this.render, this);
			this.collection.on('add', this.saveUnitCollection, this);
			this.model.on( 'plus', this.plus, this );
		},
		events: {
			'click .plus' : 'confirmQuantity'
		},
		template: _.template( $('#material-price-plus').html() ),
		render: function () {
			var strTemplate = this.template( this.model.toJSON() );
			this.$el.html( strTemplate );
		},
		confirmQuantity: function () {
			var quantity = prompt( 'Please enter the quantity of ' + this.model.get ( 'material' )  );
			if ( ( quantity !== '' ) && ( quantity !== null ) ) {
				var newModel = new App.Models.UnitItem();
				newModel.set ( {material: this.model.get('material'), count: quantity, unitItemPrice: quantity*this.model.get( 'price' ) } );
				var tempPrice = this.options.something.get( 'unitPrice' ) + newModel.get('unitItemPrice'); 
				this.options.something.set("unitPrice", tempPrice);
				this.collection.add ( newModel );
				this.options.something.set({mcollection: this.collection});
				App.dbConnector.EditUnitItem(this.options.something);
			} else {
				alert( 'You have not entered a correct value!' );
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