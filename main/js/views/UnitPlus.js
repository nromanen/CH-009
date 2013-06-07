define([
	'jquery',
	'underscore',
	'backbone',
	'app',
	'text!../templates/unitPlus.html'

], function($, _, Backbone, App, unitPlusTemplate) {

	var UnitPlus = Backbone.View.extend({ // это вид модели
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
		render: function () {
			var strTemplate = _.template( unitPlusTemplate, this.model.toJSON() );
			this.$el.html( strTemplate );
		},
		addOne: function () {
			this.addGoodsItem(1);
		},
		keypress: function (e) {
			if (e.which === 13) {
				this.addQuantity();
				e.stopImmediatePropagation();
			}
		},
		elementMouseEnter: function () {
			this.$el.find('.additional').show();
			this.$el.find('input').val('1');
			this.$el.find('input').focus();
		},
		elementMouseLeave: function () {
			this.$el.find('.additional').hide();
		},
		addGoodsItem: function( quantity ) {

			// this.collection  коллекція юнітів (goodsItems Collection), яка містить додані юніти
			// this.model  модель, яка додається (на яку клікнули)
			// this.options.something
			
			console.log(this.model.get('name'));

			var that = this;
			var found = this.collection.find( function( model ) {
			    return model.get('units') === that.model.get('name');
			});
			console.log(found);
			if ( found === undefined ) {
				this.model.set ( { count: quantity, units: this.model.get('name'), goodsItemPrice: quantity*this.model.get( 'unitPrice' ) } );
				var newModel = new App.Models.GoodsItem( this.model.toJSON() );
				this.collection.add ( newModel );
				this.options.something.set( "goodsPrice", this.options.something.get('goodsPrice')+this.model.get( 'goodsItemPrice' ) );
			} else {
				var sum = parseFloat( found.get( 'count' ) ) + parseFloat(quantity);
				var newPrice = parseFloat( found.get( 'goodsItemPrice' ) ) + this.model.get('unitPrice')*quantity;
				found.set('count', sum);
				found.set('goodsItemPrice', newPrice);
				this.options.something.set("goodsPrice", this.options.something.get('goodsPrice')+this.model.get( 'unitPrice' )*quantity);	
			}
			
			this.options.something.set( "goodsCollection", this.collection );	

			App.dbConnector.EditGoodsItems( this.options.something );
			
			//editing the sentence in the Add Unit to Goods Modal
			var unitsInGoodsSentence = ''; // for #addUnit2Goods sentence
			
			_.each ( this.collection.models, function ( goodsItem ) {
				unitsInGoodsSentence = unitsInGoodsSentence + ', ' + goodsItem.get('units') + ' <b>x ' + goodsItem.get('count') + '</b>';
			} )
			$('#addUnit2Goods').find('.goodItems_list').html( unitsInGoodsSentence.substr(2) );
			
		},
		addQuantity: function () {
			var quantity = this.$el.find('input').val();

			if ( quantity !== null ) {
				var clearQuantity = Math.abs( quantity.replace(/\s/g, "") ); // delete all spaces
				
				if ( ( clearQuantity !== '' ) && ( clearQuantity !== null ) && ( !isNaN(clearQuantity) ) ) {

					this.addGoodsItem( clearQuantity );

				}
				else{
					this.$el.find('input').val('').focus();
					//do some error
				}

			} else {
				return false;
			}
		},
		saveUnitCollection: function () {
		
			console.log('App.dbConnector.EditUnitItem triggered!');
			
		},
		
		
		plus: function () {
		
		}
	});

	return UnitPlus;

});