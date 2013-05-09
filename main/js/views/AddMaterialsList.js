var App = App || {};

(function () {	

	App.Views.AddMaterialsList = Backbone.View.extend({
	
		tagName: 'ul',
		className: 'nobullets',
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
			'click .icon-plus'    : 'confirmQuantity',
			'dblclick .icon-plus' : 'confirmQuantity'
		},
		template: _.template( $('#material-price-plus').html() ),
		render: function () {
			var strTemplate = this.template( this.model.toJSON() );
			this.$el.html( strTemplate );
		},
		addOne: function () {

			this.addUnitItem( 1 );

		},
 		addUnitItem: function( quantity ) {

			//this.model.set ( { count: quantity, unitItemPrice: quantity*this.model.get( 'price' ) } );
			var that = this;
			var found = this.collection.find( function( model ) {
				//console.log( model.get('material') + ' - ' + model.get('count') )
			    return model.get('material') === that.model.get('material');
			});
			
			if ( found === undefined ) {
				this.model.set ( { count: quantity, unitItemPrice: quantity*this.model.get( 'price' ) } );
				this.collection.add ( this.model );
				this.options.something.set( "unitPrice", this.options.something.get('unitPrice')+this.model.get( 'unitItemPrice' ) );
			} else {
				//console.log( '1st found.get("count"): ' + found.get('count') );
				var sum = parseFloat( found.get( 'count' ) ) + quantity;
				var newPrice = parseFloat( found.get( 'unitItemPrice' ) ) + this.model.get('price')*quantity;
				console.log ('quantity: ' + quantity)
				console.log ('sum: ' + sum);
				found.set ('count',sum);
				found.set('unitItemPrice',newPrice);
				this.options.something.set("unitPrice", this.options.something.get('unitPrice')+this.model.get( 'price' )*quantity);	

				//console.log( '2nd found.get("count"): ' + found.get('count') );
				//console.log( this.collection );
			}
			
			this.options.something.set( "mcollection", this.collection );	

			App.dbConnector.EditUnitItem ( this.options.something );

			//editing the sentence in the Add to Unit Modal
			var materialsInUnitSentence = ''; // for #addMaterial2Unit sentence
			_.each ( this.collection.models, function ( unitItem ) {
				console.log (  unitItem.get('material') + ' - ' + unitItem.get('count') );
				materialsInUnitSentence = materialsInUnitSentence + ', ' + unitItem.get('material') + ' ($' + unitItem.get('price') + ') <b>x ' + unitItem.get('count') + '</b>';
			} )
			$('#addMaterial2Unit').find('.unitItems_list').html( materialsInUnitSentence.substr(2) );

		},
		confirmQuantity: function () {
			var quantity = prompt( 'Please enter the quantity of ' + this.model.get ( 'material' )  );
			if(quantity !== null){ // if user click cancel, nothing to do
				var clearQuantity = quantity.replace(/\s/g, ""); // delete all spaces

				if ( ( clearQuantity !== '' ) && ( clearQuantity !== null ) && ( !isNaN(clearQuantity) ) ) {

				this.addUnitItem( parseFloat(clearQuantity) );

				} else {
					alert( 'You have not entered a correct value!' );
				}
			}
			else return false;
		},
		saveUnitCollection: function () {

			//App.dbConnector.EditUnitItem ( this.options.something );
			console.log('App.dbConnector.EditUnitItem triggered!');

		},
		
		
		plus: function () {
		
		
		
		}
	});
	
}());