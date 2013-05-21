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

			var found = App.Units.find ( function (modelUnit) {
				return strUnit === modelUnit.get('name');
			});

			if ( found === undefined ) {
				if ( strUnit === "" || strUnit.length > 100) {

					$('#myModalLabelUnit').after('<div class="error">Please enter the Unit name!</div>');
					$('#unit').val('');
					$('#unit').focus();
					return false;
				} 
				$('.close-addNewUnit').click();
				this.addItem ( strUnit );
			} else {
				$('#myModalLabelUnit').after('<div class="error">Such name is used already. Please change the unit name.</div>');
				$('#unit').focus();
				return false;
			}
		
		},
		addItem: function( strUnit ) {
			

			var newUnitCollection = new App.Collections.UnitItems([]);
			
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