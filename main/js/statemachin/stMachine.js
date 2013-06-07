define([
	'app'
], function(App) {

	var App = App || {};

	App.StateMachine.execut = function (curentState){
		console.log(App.State.Lest);
		if(App.State.Lest){

			switch(App.State.Lest){

				case "customer":
					console.log("fire custumer");
					App.Goods.off("add");
					break;

				case "accountant":
				console.log("fire accountant");
					App.Goods.off("add");
					App.Units.off("add");
					break;

				case "engineer":
				console.log("fire engineer");
					App.Goods.off("add");
					App.Units.off("add");
					App.Materials.off("add");
					break;

				case "storekeeper":
					console.log("fire storekeeper");
					App.Materials.off("add")
					break;

				default:
					console.log("Таких занчень не знайдено "+ App.State.Lest);

			}
		}

		App.State.Lest = curentState;

	}

	return App.StateMachine;

});