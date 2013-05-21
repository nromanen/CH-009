var App = App || {};

(function () {	

	App.StateMachine.execut =  function (curentState){
		console.log(App.State.Lest)
		if(App.State.Lest){

			switch(App.State.Lest){

				case "customer":
					console.log("fire custumer")
					break;

				case "accountant":

					break;

				case "engineer":

					break;

				case "storekeeper":

					break;

				default:
					console.log("Таких занчень не знайдено "+ App.State.Lest);

			}
		}

		App.State.Lest = curentState;
		console.log(App.State.Lest)

	}










})()