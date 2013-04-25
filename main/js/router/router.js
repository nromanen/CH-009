var App = App || {};

(function () {

	App.Router = Backbone.Router.extend({

		

		routes: {
			''            : 'chooseRole',
			'customer'    : 'openCustomer',
			'accountant'  : 'openAccountant',
			'engineer'    : 'openEngineer',
			'storekeeper' : 'openStorekeeper'

		},
		chooseRole: function () {
		console.log("1");
			App.Events.trigger( 'chooseRole' );
		},
		openCustomer: function () {
			console.log("2");
			App.Events.trigger( 'openCustomer' );
		},
		openAccountant: function () {
			console.log("3");
			App.Events.trigger( 'openAccountant' );
		},
		openEngineer: function () {
			console.log("4");
			App.Events.trigger( 'openEngineer' );
		},
		openStorekeeper: function () {
			console.log("5");
			App.Events.trigger( 'openStorekeeper' );
		}

	});

}())