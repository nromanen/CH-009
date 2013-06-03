define([
	'jquery',
	'underscore',
	'backbone',
	'app',
	'text!../templates/materialAccountant.html',
	'text!../templates/materialStorekeeper.html'

], function($, _, Backbone, App,
	materialAccountantTemplate, materialStorekeeperTemplate) {

	var Material = Backbone.View.extend({ // это вид модели
		tagName: 'tr',
		initialize: function () {
			//this.model.on('change:material', this.render, this);
			this.model.on('change:price', this.changeUnitItemPrice, this);
			this.model.on( 'destroy', this.remove, this );
		},
		events: {
			'click .delete' : 'confirmRemove',
			'click .edit' : 'edit',
			'dblclick .price' : 'edit',
			'keypress .editPrice' : 'onEnter',
			'blur .editPrice' : 'saveNewPrice'
		},
		render: function () {
			if ( App.userRole === 'accountant' ) {
				var Template = _.template( materialAccountantTemplate, this.model.toJSON() );
			} else if ( App.userRole === 'storekeeper' ) {
				var Template = _.template( materialStorekeeperTemplate, this.model.toJSON() );
			}
			this.$el.html( Template );
		},
		onEnter: function (e) {
			if (e.which === 13) {
				this.saveNewPrice();
			}
		},
		edit: function () {
			this.$el.addClass('editing');
			this.$el.find('input').focus();
		},
		saveNewPrice : function () {
			var value = this.$el.find('input').val();
			if ( isNaN ( value ) || value <0 || value == '' || value.length > 6) {
				this.$el.find('input').val('');
				this.$el.removeClass('editing');
				return;
			} else {
				this.$el.removeClass('editing');
				this.model.set('price', value);
				App.dbConnector.changeMaterialPrice( this.model );
				this.$el.find('.price').html('$'+value);
			}
		},
		changeUnitItemPrice: function (){
			App.Events.trigger('changeUnitItemPrice', this.model);
		},
		confirmRemove: function () {
			//var arr = this.collection;
			console.log(this.collection);
			var delMat = this.model.get("material");
			var unitModels = App.Units.models;

			for(var i = 0; i < unitModels.length; i++ ) {
			var arr = unitModels[i].get("mcollection").toJSON();

				for (var j = 0; j < arr.length; j++) {

					if (arr[j].material === delMat) {

						$('#NewMaterialButton').after('<div class="error">Attention! This material is used in unit: ' + unitModels[i].get("name") + '</div>');
					};
				};
			};
		
			
			if ( confirm('Are you sure you want to delete this product?') ) {
				App.Events.trigger( 'destroyModel', this.model );
			};

			$('#TabContent').find('.error').remove(); //detele eror message after confirm  
		},
		remove: function () {
		
			this.$el.remove();
		
		}
	});

	return Material;

});