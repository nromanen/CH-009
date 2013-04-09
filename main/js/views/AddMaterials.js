var App = App || {};

(function () {	

	App.Views.AddMaterialsList = Backbone.View.extend({
	
		tagName: 'ul',
		initialize: function () {
			this.collection.on('add', this.addOne, this);
		},
		render: function () {
			this.collection.each(this.addOne, this);
			return this;
		},
		addOne: function(modelMaterial) {
			var MaterialsCollection = this.model.get ( 'mcollection' );
			var MaterialView = new App.Views.MaterialPlus({ model: modelMaterial, collection: MaterialsCollection });
			MaterialView.render();
			this.$el.append( MaterialView.el );
		}
	
	});
	
	App.Views.MaterialPlus = Backbone.View.extend({ // это вид модели
		tagName: 'li',
		initialize: function () {
			//this.model.on('change:material', this.render, this);
			//this.model.on('change:price', this.render, this);
			this.model.on( 'plus', this.plus, this );
		},
		events: {
			'click .plus' : 'confirmQuantity'
		},
		template: _.template( $('#material-price-plus').html() ),
		render: function () {
			var strTemplate = this.template( this.model.toJSON() );
			this.$el.html( strTemplate );
		},
		confirmQuantity: function () {
			var strQuantity = prompt( 'Пожалуйста, укажите количество ' + this.model.get ( 'material' )  );
			if ( ( strQuantity !== '' ) && ( strQuantity !== null ) ) {
				this.model.set ( { count: strQuantity } )
				this.collection.add ( this.model ); 
				//App.Events.trigger( 'addUnitItem', this.model );  
			}	
		},
		plus: function () {
		
		
		
		}
	});
	
}());