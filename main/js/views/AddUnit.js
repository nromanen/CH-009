var App = App || {};

(function () {

	App.Views.AddUnit = Backbone.View.extend({
		el: '#addNewUnit',
		tagName: 'addNewUnit',
		events: {
			'keypress input' : 'inputKeypress',
			'click .save-material' : 'validateItem'
		},
		inputKeypress: function(e) {
			if (e.which === 13) {
				this.validateItem();
			}
		},
		validateItem: function () {

			this.$el.find('.error').remove();
			var strUnit = $('#unit').val().trim(); 	
			
			if ( strUnit === "" ) {

				$('#myModalLabelUnit').after('<div class="error">Please enter the Unit name!</div>');
				$('#unit').val('');
				$('#unit').focus();
				return false;
			}
			
			$('.close-addNewUnit').click();
			this.addItem ( strUnit );
		
		},
		addItem: function( strUnit ) {
			
			var newUnitCollection = new App.Collections.UnitItems([
				/*{
					unitID: 1,
					material: 'empty',
					count: 0	
				}*/
			]);
			
			var modelUnit = new App.Models.Unit ({
				
				name: strUnit,
				mcollection: newUnitCollection,
				unitPrice: 0
				
			});
			
			App.Events.trigger( 'addUnit', modelUnit );
			
			$('.units .unit').each( function () {
				
				$(this).find('.unit_info').toggle();
				
			});
			
			this.clearTextBoxes();
		},
		clearTextBoxes: function() {
			$('#unit').val('');
			$('#unit').focus();
		}
	});

}());