define([
	'jquery',
	'underscore',
	'backbone',
	'text!../templates/addGoodsButton.html'

], function($, _, Backbone, addGoodsButtonTemplate) {

	var AddGoodsButton = Backbone.View.extend({

		el: 'div',
		initialize: function() {
			this.render();
		},
		events: {
			'click .addGoodsButton' : 'showAddGoodsView'
		},
		template: _.template( addGoodsButtonTemplate ),
		render: function() {
			$('#products').append( this.template() );
		},
		showAddGoodsView: function () {
			$('#addGoodsView').show();
			$('#addGoodsView').find('input').focus();
			$('#products .accordion-heading').on('click', function() { $('#addGoodsView').hide() });
		}

	});

	return AddGoodsButton;

});