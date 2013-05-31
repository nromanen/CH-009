define([
	'jquery',
	'underscore',
	'backbone',
	'app'

], function($, _, Backbone, App) {

	var AddUnitsView = Backbone.View.extend({

		el: 'div',
		events: {
			'keypress input' : 'inputKeypress',
			'click .add-units' : 'validateItem',
			'click .cancel-units' : 'cancelUnits'
		},
		initialize: function() {
			this.render();
		},
		template: _.template( $('#addUnitsViewTemplate').html() ),
		render: function() {
			$('#units').append( this.template() );
		},
		inputKeypress: function(e) {
			if (e.which === 13) {
				this.validateItem();
			}
		},
		validateItem: function () {

			this.$el.find('.error').remove();
			var strUnit = this.$el.find('#unitsName').val().trim();
			var found = App.Units.find ( function (modelUnit) {
				return strUnit === modelUnit.get('name');
			});

			if ( found === undefined ) {
				if ( strUnit === "" || strUnit.length > 100) {

					$('#units .accordion').before('<div class="alert alert-error">Enter unit name, please<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
					setTimeout( function() { 
						$('.close').click();
					}, 2000);
					$('#unitsName').val('');
					$('#unitsName').focus();
					return false;
				} 

				this.addItem ( strUnit );
				return false;
			} else {
				
				$('#units .accordion').before('<div class="alert alert-error">Such name is used already. Please change the unit name.<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
					setTimeout( function() { 
						$('.close').click();
					}, 2000);
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
			$('#unitsName').val('');
			$('#unitsName').focus();
		},
		cancelUnits: function() {
			$('#unitsName').val('').focus();
		}
	});

	return AddUnitsView;

});