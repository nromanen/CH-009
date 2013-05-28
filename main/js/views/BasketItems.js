var App = App || {};

(function () {

	App.Views.BasketItems =  Backbone.View.extend({

		tagName:'tr',

		initialize: function (){



			
		},

		render: function (){
			

			var strTemplate = _.template( $('#basket').html(), this.model.toJSON() );
			this.$el.html(strTemplate);




		},




	});
})();