var App = App || {};

(function () {	

	App.Views.AddUnitsList = Backbone.View.extend({
	
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
		addOne: function(modelUnits) {
			var UnitsCollection = this.model.get ( 'goodsCollection' );
			var UnitView = new App.Views.UnitPlus({ model: modelUnits, collection: UnitsCollection, something: this.model });

			UnitView.render();
			this.$el.append( UnitView.el );
			
		},
		saveUnitCollection: function () {
			App.dbConnector.EditUnitItem ( this.model );
		}
	
	});
	
	App.Views.UnitPlus = Backbone.View.extend({ // это вид модели
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
		template: _.template( $('#goods-count-plus').html() ),
		render: function () {
			var strTemplate = this.template( this.model.toJSON() );
			this.$el.html( strTemplate );
		},
		addOne: function () {
			this.addGoodsItem(1);
		},
		keypress: function (e) {
			if (e.which === 13) {
				this.addQuantity();
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

			console.log(this.collection); // коллекція юнітів (goodsItems Collection), яка містить додані юніти
			console.log(this.model); // модель, яка додається (на яку клікнули)
			console.log(this.options.something);
			
			console.log(this.model.get('name'));

			var that = this;
			var found = this.collection.find( function( model ) {
			    return model.get('units') === that.model.get('name');
			});
			console.log(found);
			if ( found === undefined ) {
				this.model.set ( { count: quantity, units: this.model.get('name'), goodsItemPrice: quantity*this.model.get( 'unitPrice' ) } );
				this.collection.add ( this.model );
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
				var clearQuantity = quantity.replace(/\s/g, ""); // delete all spaces
				
				if ( ( clearQuantity !== '' ) && ( clearQuantity !== null ) && ( !isNaN(clearQuantity) ) ) {

					this.addGoodsItem( clearQuantity );
				
				}
				else{
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
	
}());