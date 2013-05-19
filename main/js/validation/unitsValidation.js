var App = App || {};

(function () {

	function validateUnitsConfirmQuantity (quantity) {

		if ( quantity !== null ) {
			var clearQuantity = quantity.replace(/\s/g, ""); // delete all spaces
			if ( ( clearQuantity !== '' ) && ( clearQuantity !== null ) && ( !isNaN(clearQuantity) ) ) {

				newModel = new App.Models.GoodsItem({units:this.model.get ( 'name' ), count:clearQuantity, goodsItemPrice: this.model.get('unitPrice')*clearQuantity})
				this.collection.add (newModel);
				this.options.something.set("goodsPrice", this.options.something.get("goodsPrice")+newModel.get('goodsItemPrice') );
				this.options.something.set("goodsCollection", this.collection);
					App.dbConnector.EditGoodsItems(this.options.something);
			
			
			}
			else{
				this.confirmQuantity();
			}


		} else {
			return false;
		}
	}
}()); 