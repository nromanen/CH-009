var App = App || {};
(function () {

	App.Views.AddGoodsButton = Backbone.View.extend({

		el: 'div',
		initialize: function() {
			this.render();
		},
		events: {
			'click .addGoodsButton' : 'showAddGoodsView'
		},
		template: _.template( $('#addGoodsButtonTemplate').html() ),
		render: function() {
			$('#products').append( this.template() );
		},
		showAddGoodsView: function () {
			$('#addGoodsView').show();
			$('#addGoodsView').find('input').focus();
		}

	});

	App.Views.AddGoodsView = Backbone.View.extend({
		
		el: 'div',
		events: {
			'keypress input': 'inputKeypress',
			'click .add-goods' : 'validateItem',
			'click .cancel-goods' : 'cancelGoods'
		},
		initialize: function () {
			this.render();
		},
		template: _.template( $('#addGoodsViewTemplate').html() ),
		render: function () {
			$('#products').append( this.template() );
		},
		inputKeypress: function(e) {
			if (e.which === 13) {
				this.validateItem();
			}
		},
		validateItem: function () {

			$('#addGoodsView').find('.error').remove();
			var goodsName = $('#goods').val().trim(); 	
			
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
			
			this.clearTextBoxes();
		},
		clearTextBoxes: function() {

			$('#goods').val('');
			$('#goods').focus();

		},
		cancelGoods: function () {
			$('#addGoodsView').hide();
		}		
		
		});
	

}());