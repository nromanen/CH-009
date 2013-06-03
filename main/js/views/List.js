define([
	'jquery',
	'underscore',
	'backbone',
	'app',
	'materialView',
	'text!../templates/listAccountant.html',
	'text!../templates/listStorekeeper.html'

], function($, _, Backbone, App, materialView, listAccountantTemplate,
	listStorekeeperTemplate) {

	var List = Backbone.View.extend({  // это вид коллекции
	
		tagName: 'table',
		className: 'table',
		initialize: function () {
			this.collection.on('add', this.addOne, this);
		},
		render: function () {
			if ( App.userRole === 'accountant' ) {
				this.$el.append( listAccountantTemplate );
			} else if ( App.userRole === 'storekeeper' ) {
				this.$el.append( listStorekeeperTemplate );
			}
			this.collection.each(this.addOne, this);
			return this;
		},
		addOne: function( modelMaterial ) {
			var MaterialView = new materialView({ model: modelMaterial });
			MaterialView.render();
			this.$el.append( MaterialView.el );
		}
	
	});

	return List;

});