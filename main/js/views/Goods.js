var App = App || {};

(function () {

	App.Views.Goods = Backbone.View.extend({
	
			
		tagName: 'div',
		className:"accordion-group",
		initialize: function () {		
			this.model.on( 'change:nameG', this.nameUpDate, this);
			this.model.on( 'destroy', this.goodsRemoveItem, this );
			this.model.on( 'changes', this.goodsChange );
			this.model.on( 'change:nameG', this.refreshGoodsName, this );
			this.model.on( 'change:goodsPrice', this.refreshGoodsPrice, this );
		},
		
		events: {
			'click .accordion-heading' : 'goodsToggle',
			'click .delete_goods' : 'goodsDeleteItem',
			'click .edit_right' : 'changeGoodsName',
			'keypress .edit_goods_name': 'updateOnEnter',
			'blur .edit_goods_name': 'close',
			'click .btn': 'inputUnits'
		},
		render: function () {	
			
			var goodsHrefId = this.model.cid;
			goodsHrefId = goodsHrefId.replace(" ","");
			this.model.set('hrefId', goodsHrefId);
			console.log(JSON.stringify(this.model.toJSON()));

			if ( App.userRole === 'customer' ) {
				var strTemplate = _.template( $('#goods-name-customer').html(), this.model.toJSON() );
			} else {
				var strTemplate = _.template( $('#goods-name').html(), this.model.toJSON() );
			}

			this.$el.html( strTemplate );
			var newGoodsItemsList = new App.Views.GoodsItemsList( { collection: this.model.get( 'goodsCollection' ), model: this.model  } ) ;

			this.$el.append( newGoodsItemsList.el );
			newGoodsItemsList.render();
			
			this.$input = this.$('.edit_goods_name');
			
		}, 
		goodsChange: function () {
			//
		},
		refreshGoodsName: function (){
			this.$el.find('.goods_name_id').html(this.model.get('nameG'));
		}, 
		refreshGoodsPrice: function (){
			this.$el.find('.goodsPrice').html('$'+this.model.get('goodsPrice'));
		},
		nameUpDate: function (){

			console.log($('#'+this.model.cid+"_goodsId").html(this.model.get("nameG")));


		},
		goodsToggle: function () {
			
				this.$('.goods_info').show();
							
		},
		inputUnits: function () {
			
				var AddUnitsList = new App.Views.AddUnitsList( { collection: App.Units, model : this.model	} );
				AddUnitsList.render();
				$( '#unitContainer' ).html( AddUnitsList.el );

				$('#addUnit2Goods').find('#myModalLabel').html('Add Units to ' + this.model.get('nameG') );
				
				var unitsInGoods = this.model.get( 'goodsCollection' );
				var unitsInGoodsSentence = ''; // for #addUnit2Goods sentence
				_.each ( unitsInGoods.models, function ( goodsItem ) {
					unitsInGoodsSentence = unitsInGoodsSentence + ', ' + goodsItem.attributes.units + ' <b>x ' + goodsItem.attributes.count + '</b>';
				} )
				$('#addUnit2Goods').find('.goods_text').html( '<b>' + this.model.get('nameG') + '</b> already contains: <span class="goodItems_list">' + unitsInGoodsSentence.substr(2) + '</span>' );

		},
		goodsDeleteItem: function() {
		
			if ( confirm('Are you sure you want to delete this Goods?') ) {
				
				App.Events.trigger( 'goodsDelete', this.model );
			}
		
		},
		goodsRemoveItem: function() {
		
			this.$el.remove();
			$('.AddUnitsList').hide();
	
		},
		changeGoodsName: function () {
			this.$el.addClass('editing');
			this.$input.focus();
			
		},
		close: function () {
			var value = this.$input.val().trim();
			if ( value =='' ) {
			this.$el.removeClass('editing');
			return;
			};
			if  ( ! value ) {
			this.$el.removeClass('editing');
			return;
			}
			App.Events.trigger('editGoodsName', this.model, value);
			this.$el.removeClass('editing');
		},
		updateOnEnter: function (e) {
			if (e.keyCode == 13) {
				this.close(); 
			}
		},
		
		
		
	});
	
	App.Views.GoodsList = Backbone.View.extend({  // это вид коллекции
		
		tagName: 'div',

		initialize: function () {
			this.collection.on('add', this.render, this);
			
		},
		render: function () {
				
            this.$el.html('');
          	this.collection.each( this.addOne, this );
			return this;
			
		},
		addOne: function( modelGoods ) {
			
			var GoodsView = new App.Views.Goods({ model: modelGoods });
			this.$el.prepend( GoodsView.el );
			
			GoodsView.render();
			
			var jq_goods_info = '.goods_info';
			this.$el.find( jq_goods_info ).hide();

		}
			
		
	});

}());