define([
	'app'
], function(App) {

	var App = App || {};

	App.StateMachine.execut = function (curentState){
		console.log(App.State.Lest);
		if(App.State.Lest){

			switch(App.State.Lest){

				case "customer":
				
					App.Goods.off("add");
					break;

				case "accountant":
				
					App.Goods.off("add");
					App.Units.off("add");
					break;

				case "engineer":
				
					App.Goods.off("add");
					App.Units.off("add");
					App.Materials.off("add");
					break;

				case "storekeeper":
					
					App.Materials.off("add")
					break;

				default:
					

			}
		}

		App.State.Lest = curentState;

	}

	return App.StateMachine;

});