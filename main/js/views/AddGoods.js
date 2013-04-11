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
				alert ( 'Пожалуйста, введите название товара!' );
				$('#goods').val('');
				$('#goods').focus();
				return false;
			}
			
			this.addItem ( goodsName );
		
		},
		addItem: function ( goodsName ) {
		
			var newGoodsCollection = new App.Collections.GoodsItems([
				{
					unit: 'empty',
					sumPrice: 0	
				}
			]);
			
			var modelUnit = new App.Models.Unit ({
				
				name: goodsName,
				goodsCollection: newGoodsCollection
				
			});
		
		}
		
		
	)};

}());