var App = App || {};

(function () {

	App.Views.AddMaterial = Backbone.View.extend({
		el: '#addNewMaterial',
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
			var strMaterial = $('#material').val().trim(); 	
			var strPrice = $('#price').val().trim();
			 
			if(ValidateMaterialPrice( strMaterial, strPrice)) {

				for ( var i = 0; i < this.collection.length; i++ ) {
					
					if ( strMaterial === this.collection.models[i].get ( 'material' ) ) {

						$('#myModalLabel').after('<div class="error">Material named ' + strMaterial + ' already exists! There should be NO material names repeated!</div>');
						$('#material').focus();
						return false;
						
					}
					
				}

				$('.close-addNewMaterial').click();
				this.addItem ( strMaterial, strPrice );
			}
		
		},
		addItem: function( strMaterial, strPrice ) {
			
			var modelMaterial = new App.Models.Material({ 
				material: strMaterial, 
				price: parseInt(strPrice) 
			});
			
			App.Events.trigger( 'addModel', modelMaterial );
			
			this.clearTextBoxes();
		},
		clearTextBoxes: function() {
			$('#material').val('');
			$('#price').val('');
			$('#material').focus();
		}
	});	

})();