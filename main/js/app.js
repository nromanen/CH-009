define([], function() {
  
  	var App = App || {
	
		Models: App.Models || {},
		Views: App.Views || {},
		Collections: App.Collections || {},
		dbConnector: App.dbConnector || {},
		Events : _.extend( {}, Backbone.Events ),
		HTML : App.HTML || {},
		State: App.State || {},
		StateMachine: App.StateMachine || {}
		
	};

  	return App;

});