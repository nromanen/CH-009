var App = App || {};

(function () {

	App.Views.BasketItems =  Backbone.View.extend({

		tagName:'div',

		initialize: function (){



			
		},

		render: function (){
			

			var strTemplate = _.template( $('#basket').html(), this.model.toJSON() );
			this.$el.html(strTemplate);




		},




	});
})();