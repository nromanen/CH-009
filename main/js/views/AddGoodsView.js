define([
	'jquery',
	'underscore',
	'backbone',
	'app',
	'text!../templates/addGoodsView.html'

], function($, _, Backbone, App, addGoodsViewTemplate) {

	var AddGoodsView = Backbone.View.extend({

		el: 'div',
		events: {
			'keypress #goods': 'inputKeypress',
			'blur #goods'    : 'blurInput',
			'mousedown .add-goods' : 'validateItem',
			'mousedown .cancel-goods' : 'cancelGoods'
		},
		initialize: function () {
			this.render();
		},
		template: _.template( addGoodsViewTemplate ),
		render: function () {
			$('#products').append( this.template() );
		},
		inputKeypress: function(e) {
			e.stopPropagation(); 
			if (e.which === 13) {
				this.validateItem();
			}

		},
		validateItem: function () {

			console.log('validateItem');
			$(this.el).off('blur #goods');

			$('#addGoodsView').find('.error').remove();

			var goodsName = this.$el.find('#goods').val().trim();

			if ( goodsName === "" ) {
				$('#products > div.clearfix').after('<div class="alert alert-error">Enter the goods name, please<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
					setTimeout( function() {
						$('.close').click();
					}, 2000);

				$('#goods').val('');
				$('#goods').focus();
				return false;
			}

			this.addItem ( goodsName );
			return false;

		},
		blurInput : function (e) {
			e.stopPropagation();
			this.$el.find('#addGoodsView').hide();
		},
		addItem: function ( goodsName ) {

			var newGoodsCollection = new App.Collections.GoodsItems(/*[
				{
					units: 'goods1',
					count: 0,
					goodPrice: 0
				}
			]*/);

			var modelGoods = new App.Models.Goods ({

				nameG: goodsName,
				goodsCollection: newGoodsCollection,
				goodsPrice : 0

			});

			App.Events.trigger( 'addGoods', modelGoods );

			$('.goods').each( function () {

				$(this).find('.goods_info').toggle();

			});

			this.clearTextBox();
		},
		clearTextBox: function () {

			$('#goods').val('').focus();

		},
		cancelGoods: function (e) {

			e.stopImmediatePropagation(); 
			$(this.el).off('blur #goods');
			this.$el.find('#goods').focus();
			console.log('cancelGoods');	
			//$('#goods').val('').focus();		
			//this.clearTextBox();
			//$(this.el).on('blur #goods', this.blurInput);
		}

		});

	return AddGoodsView;

});