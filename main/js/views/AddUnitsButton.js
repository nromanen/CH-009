define([
	'jquery',
	'underscore',
	'backbone',
	'text!../templates/addUnitsButton.html'

], function($, _, Backbone, addUnitsButtonTemplate) {

	var AddUnitsButton = Backbone.View.extend({

		el: 'div',
		initialize: function(){
			this.render();
		},
		events: {
			'click .addUnitsButton' : 'showAddUnitsView'
		},
		template: _.template( addUnitsButtonTemplate ),
		render: function() {
			$('#units').append( this.template() );
		},
		showAddUnitsView: function() {
			$('#addUnitsView').show();
			$('#addUnitsView').find('input').focus();
			$('#units .accordion').on('click', function() { $('#addUnitsView').hide() });
			
		}

	});

	return AddUnitsButton;

});