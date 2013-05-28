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
			$('#units .accordion').on('click', function() { $('#addUnitsView').hide() });
			
		}

	});

})();