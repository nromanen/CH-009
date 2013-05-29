var App = App || {};

(function () {

	App.Views.PlusMaterial = Backbone.View.extend({ // это вид модели
		tagName: 'li',
		initialize: function () {
			this.collection.on('add', this.saveUnitCollection, this);
			this.model.on( 'plus', this.plus, this );
		},
		events: {
			'mouseenter .add_item' : 'elementMouseEnter',
			'mouseleave .add_item' : 'elementMouseLeave',
			'click a' : 'addOne',
			'click .add': 'addQuantity',
			'keypress input': 'keypress'
		},
		template: _.template( $('#material-price-plus').html() ),
		render: function () {
			var strTemplate = this.template( this.model.toJSON() );
			this.$el.html( strTemplate );
		},
		keypress: function (e) {
			if (e.which === 13) {
				this.addQuantity();
			}
		},
		addOne: function () {
			this.addUnitItem(1);
		},
		elementMouseEnter: function () {
			this.$el.find('.additional').show();
			this.$el.find('input').val('1');
			this.$el.find('input').focus();
		},
		elementMouseLeave: function () {
			this.$el.find('.additional').hide();
		},
 		addUnitItem: function( quantity ) {

			var that = this;
			var found = this.collection.find( function( model ) {
			    return model.get('material') === that.model.get('material');
			});
			
			if ( found === undefined ) {
			
				this.model.set ( { count: quantity, unitItemPrice: quantity*this.model.get( 'price' ) } );
				this.collection.add ( this.model );
				this.options.something.set( "unitPrice", this.options.something.get('unitPrice')+this.model.get( 'unitItemPrice' ) );
			
			} else {

				var sum = parseFloat( found.get( 'count' ) ) + quantity;
				var newPrice = parseFloat( found.get( 'unitItemPrice' ) ) + this.model.get('price')*quantity;
				console.log ('quantity: ' + quantity)
				console.log ('sum: ' + sum);
				found.set('count', sum);
				found.set('unitItemPrice', newPrice);
				this.options.something.set("unitPrice", this.options.something.get('unitPrice')+this.model.get( 'price' )*quantity);	

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

		addQuantity: function () {
			var quantity = this.$el.find('input').val();
			if (quantity.length < 5) { 
				
				var clearQuantity =  Math.abs( quantity.replace(/\s/g, "") ); // delete all spaces, and make positive

					if(( clearQuantity !== '' ) && ( clearQuantity !== null ) && ( !isNaN(clearQuantity) )) {

						this.addUnitItem( parseFloat(clearQuantity) );
					}
					else {
					//do some error
					this.$el.find('input').val('').focus();
				}

			}
			else {
				this.$el.find('input').val('').focus();
				return false;
			}

		},
		saveUnitCollection: function () {

			//App.dbConnector.EditUnitItem ( this.options.something );
			console.log('App.dbConnector.EditUnitItem triggered!');

		}
	});

})();