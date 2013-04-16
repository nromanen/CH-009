var App = App || {};
(function () {

	App.Views.AddGoods = Backbone.View.extend({
		
		el: '#addGoods',
		events: {
			'keypress input': 'inputKeypress',
		},
		inputKeypress: function(e) {
			if (e.which === 13) {
				this.validateItem();
			}
		},
		validateItem: function () {
		
			var goodsName = $('#goods').val().trim(); 	
			
			if ( goodsName === "" ) {
				alert ( 'Поле введення даних не може бути порожнім' );
				$('#goods').val('');
				$('#goods').focus();
				return false;
			}
			
			this.addItem ( goodsName );
		
		},
		addItem: function ( goodsName ) {
		
			var newGoodsCollection = new App.Collections.GoodsItems([
				{
					units: 'goods1',
					count: 0	
				}
			]);
			
			var modelGoods = new App.Models.Goods ({
				
				nameG: goodsName,
				goodsCollection: newGoodsCollection
				
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
		}		
		
		
		});
	

}());