//jQvalidation
$(document).ready(function () {

	 $('#loginForm2').validate({
	 	onsubmit: false,
	 	onfocusout: false,
	 	rules: {
	 		login: {
	 			required:true,
	 			minlength:2
	 		},
	 		pswd: {
	 			required:true
	 		}
	 	}

	 });

var inputUnit = ('#unit');
$("<form>").append(inputUnit).validate();

}); //end ready