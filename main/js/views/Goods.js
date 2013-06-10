define([
	'jquery',
	'underscore',
	'backbone',
	'app',
	'addUnitsListView',
	'basketView',
	'goodsItemsListView',
	'text!../templates/goodsCustomer.html',
	'text!../templates/goodsEngineer.html',
	'text!../templates/tab.html',
	'text!../templates/alertAdd.html',
	'text!../templates/alertError.html'

], function($, _, Backbone, App, addUnitsListView, basketView, goodsItemsListView,
	goodsCustomerTemplate, goodsEngineerTemplate, tabTemplate, alertAddTemplate, alertErrorTemplate) {

	var Goods = Backbone.View.extend({
			
		tagName: 'div',
		className:"accordion-group",
		initialize: function () {		
			this.model.on( 'change:nameG', this.nameUpDate, this);
			this.model.on( 'destroy', this.goodsRemoveItem, this );
			this.model.on( 'changes', this.goodsChange );
			this.model.on( 'change:nameG', this.refreshGoodsName, this );
			this.model.on( 'change:goodsPrice', this.refreshGoodsPrice, this );
			App.Events.on('ErrorExist', this.errorAlert, this);
			App.Events.on( 'alertAdd', this.alertAdd, this);
		},
		events: {
			'click .accordion-heading' : 'goodsToggle',
			'click .delete_goods' : 'goodsDeleteItem',
			'click .edit_right' : 'changeGoodsName',
			'keypress .edit_goods_name': 'updateOnEnter',
			'blur .edit_goods_name': 'close',
			'click .btn': 'inputUnits',
			'click .Bay-item':'addToBasket'

		},
		render: function () {	
			
			var goodsHrefId = this.model.cid;
			goodsHrefId = goodsHrefId.replace(" ","");
			this.model.set('hrefId', goodsHrefId);

			if ( App.userRole === 'customer' ) {
				var strTemplate = _.template( goodsCustomerTemplate, this.model.toJSON() );
			} else {
				var strTemplate = _.template( goodsEngineerTemplate, this.model.toJSON() );
			}

			this.$el.html( strTemplate );
			var newGoodsItemsList = new goodsItemsListView( { collection: this.model.get( 'goodsCollection' ), model: this.model  } ) ;

			this.$el.append( newGoodsItemsList.el );
			newGoodsItemsList.render();
			
			this.$input = this.$('.edit_goods_name');
			console.log("render goods");
		}, 
		addToBasket: function (){

			if($('#shoping_cart').length==0){

				$('#myTab').append('<li class=""><a href="#shoping_cart" data-toggle="tab">Basket \
				 <i class="icon-shopping-cart"></i>=<span id="itemCount"></span></a></li>');
				$('#TabContent').append ( _.template ( tabTemplate, { 
					id      : 'shoping_cart',
					active  : '',
				}) );
				var basket = new basketView({collection:App.Basket})
				$("#shoping_cart").html(basket.el);

			}
			
			this.model.set('count',this.$el.find('.span1').val());
			App.Events.trigger("addItemtToBasket", this.model);

			this.$el.find('.span1').val('1');
			
			setTimeout( function() { $('#alertAddItem').remove() } , 2000)


		},
		errorAlert: function (){
			$('#alertAddItem').remove();
			$('body').append('<div id="alertAddItem"></div>');
			$('#alertAddItem').html(alertErrorTemplate);

			setTimeout( function() { $('#alertAddItem').remove() } , 2000)
		},
		alertAdd: function(){
			
			$('#itemCount').html(App.Basket.length);
			$('body').append('<div id="alertAddItem"></div>');

			$('#alertAddItem').html( alertAddTemplate );
			setTimeout( function() { $('#alertAddItem').remove() } , 1000)


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
		nameUpDate: function () {

		},
		goodsToggle: function () {
			
			this.$('.goods_info').show();
							
		},
		inputUnits: function () {
			
				var AddUnitsList = new addUnitsListView( { collection: App.Units, model : this.model	} );
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
		}	
		
	});
	
	return Goods;

});