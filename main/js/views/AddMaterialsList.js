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
		addOne: function( modelMaterials ) {
		
			var MaterialsCollection = this.model.get ( 'mcollection' );
			var PlusMaterial = new App.Views.PlusMaterial({ model: modelMaterials, collection: MaterialsCollection, something: this.model });
			//console.log( this.model );
			PlusMaterial.render();
			this.$el.append( PlusMaterial.el );
			
		},
		saveUnitCollection: function () {
			App.dbConnector.EditUnitItem ( this.model );
	
		}
	
	});
	
	App.Views.PlusMaterial = Backbone.View.extend({ // это вид модели
		tagName: 'li',
		initialize: function () {
			this.collection.on('add', this.saveUnitCollection, this);
			this.model.on( 'plus', this.plus, this );
		},
		events: {
			'click .icon-plus' : 'confirmQuantity'
		},
		template: _.template( $('#material-price-plus').html() ),
		render: function () {
			var strTemplate = this.template( this.model.toJSON() );
			this.$el.html( strTemplate );
		},
		confirmQuantity: function () {
			var quantity = prompt( 'Please enter the quantity of ' + this.model.get ( 'material' )  );
			if ( ( quantity !== '' ) && ( quantity !== null ) ) {

				this.model.set ( { count: quantity } )
				this.collection.add ( this.model );
				this.options.something.set( "mcollection", this.collection );	

				App.dbConnector.EditUnitItem ( this.options.something );
				console.log( this.options.something );

			} else {
				alert( 'You have not entered a correct value!' );
			}
		},
		saveUnitCollection: function () {

			//App.dbConnector.EditUnitItem ( this.options.something );
			console.log('App.dbConnector.EditUnitItem triggered!');

		},
		
		
		plus: function () {
		
		
		
		}
	});
	
}());