/*var App = App || {};

(function () {*/

	function ValidateMaterialPrice( strMaterial, strPrice) {
		if ( strMaterial === "" ) {

				$('#myModalLabel').after('<div class="error">Write name</div>');
				$('#material').val('');
				$('#material').focus();
				return false;
			}
						
			if ( isNaN( strPrice ) || strPrice < 0 || strPrice === "" )  {
			
				$('#myModalLabel').after('<div class="error">Price is incorrectly indicated!</div>');
				$('#price').val('');
				$('#price').focus();
				return false;
			
			}
		return true;
	} 

	function ValidateMaterialDelete( delMat, unitModels ) {

		for(var i = 0; i < unitModels.length; i++ ) {
			var arr = unitModels[i].get("mcollection").toJSON();

			for (var j = 0; j < arr.length; j++) {

				if (arr[j].material === delMat) {

					$('#NewMaterialButton').after('<div class="error">Attention! This material is used in unit: ' + unitModels[i].get("name") + '</div>');
				};
			};
		};
	}

	function validateMaterialConfirmQuantity (clearQuantity) {

		if(( clearQuantity !== '' ) && ( clearQuantity !== null ) && ( !isNaN(clearQuantity) )) return true;
	}

// }()); 