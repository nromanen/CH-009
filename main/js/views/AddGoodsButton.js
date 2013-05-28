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
			$('#products .accordion-heading').on('click', function() { $('#addGoodsView').hide() });
		}

	});

})();