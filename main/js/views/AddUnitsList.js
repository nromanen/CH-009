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
		addOne: function(modelMaterial) {
			var UnitsCollection = this.model.get ( 'goodsCollection' );
			var UnitView = new App.Views.UnitPlus({ model: modelMaterial, collection: UnitsCollection, something: this.model });
			//console.log( this.model );
			UnitView.render();
			this.$el.append( MaterialView.el );
			
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
			'click .plus' : 'confirmQuantity'
		},
		template: _.template( $('#goods-count-plus').html() ),
		render: function () {
			var strTemplate = this.template( this.model.toJSON() );
			this.$el.html( strTemplate );
		},
		confirmQuantity: function () {
			var quantity = prompt( 'Please enter the quantity2 of ' + this.model.get ( 'material' )  );
			if ( ( quantity !== '' ) && ( quantity !== null ) ) {
				this.model.set ( { count: quantity } )
				this.collection.add ( this.model );
				this.options.something.set("goodsCollection", this.collection);
				console.log ( this.options.something ); 	
			} else {
				alert( 'You have not entered a correct value!' );
			}
		},
		saveUnitCollection: function () {
			

			App.dbConnector.EditUnitItem (this.options.something);
			console.log('App.dbConnector.EditUnitItem triggered!');
		},
		
		
		plus: function () {
		
		
		
		}
	});
	
}());