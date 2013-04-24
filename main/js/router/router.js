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
			App.Events.trigger( 'chooseRole' );
		},
		openCustomer: function () {
			App.Events.trigger( 'openCustomer' );
		},
		openAccountant: function () {
			App.Events.trigger( 'openAccountant' );
		},
		openEngineer: function () {
			App.Events.trigger( 'openEngineer' );
		},
		openStorekeeper: function () {
			App.Events.trigger( 'openStorekeeper' );
		}

	});

}())