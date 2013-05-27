var App = App || {};

(function () {

	App.Views.AddUnitsButton = Backbone.View.extend({

		el: 'div',
		initialize: function(){
			this.render();
		},
		events: {
			'click .addUnitsButton' : 'showAddUnitsView'
		},
		template: _.template( $('#addUnitsButtonTemplate').html() ),
		render: function() {
			$('#units').append( this.template() );
		},
		showAddUnitsView: function() {
			$('#addUnitsView').show();
			$('#addUnitsView').find('input').focus();
		}

	});


	App.Views.AddUnitsView = Backbone.View.extend({

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
		remove: function() {
			$('#units').append( this.template() );
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
		},
		cancelUnits: function() {
			$('addUnitsView').hide();
		}
	});

}());