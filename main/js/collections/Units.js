var App = App || {};

(function () {

	App.Collections.Units = Backbone.Collection.extend({

		model: App.Models.Unit,
		url: "/units.json",
		initialize: function () {
			
			App.Events.on( 'addUnit', this.addModel, this );
			App.Events.on( 'fetchUnit', this.fetchUnits, this );
			App.Events.on( 'writeUnits', this.writeCollection, this );
			App.Events.on('fetchUnitsPostgDB', this.fetchPostgDB, this);
			App.Events.on('updateUnitPrice', this.updateUnitPrice, this);
			App.dbConnector.openDatabase();
			
		},
		addModel: function ( model ) {

			this.add( model );
			App.dbConnector.AddUnit ( "Units", model );
			 
		},
		fetchPostgDB: function (jsonUnits){
			var unitsArray = JSON.parse(jsonUnits)
			console.log(unitsArray)
			var totalPrise=0;
			for(i=0; i<=unitsArray .length-1;i++){
			
			
				var unitCollection = new App.Collections.UnitItems();
				
				unitCollection.add(JSON.parse(unitsArray[i].mcollection));

				_.each(JSON.parse(unitsArray[i].mcollection),  function ( model ) {

					totalPrise= parseFloat ( (totalPrise + model['unitItemPrice']).toFixed(2) );
				
				});


				var mUnit = new App.Models.Unit({
					name:unitsArray[i].name,
					mcollection:unitCollection,
					unitPrice:totalPrise
							
				});
				//console.log(unitCollection)
				
				this.addModel(mUnit);
				totalPrise=0
			}




		},
		fetchUnits: function(){
			
			App.dbConnector.fetchUnit();
		
		},
		writeCollection: function(units){
		
			for(i=0; i<=units.length-1;i++){
			
				var unitCollection = new App.Collections.UnitItems();
				
				_.each( units[i].mcollection,  function ( model ) {
					App.Materials.each( function (material) {
						if (model['material'] === material.get('material') ) {
							model['unitItemPrice'] = parseFloat( (material.get('price') * model['count']).toFixed(2) );
						}
					});
					//model['unitItemPrice']=App.Materials.where({material: model['material']}).get('price')*model['count'];
					//console.log(App.Materials.where({material: model['material']}));
				});

				_.each( units[i].mcollection,  function ( model ) {

					units[i].unitPrice = parseFloat ( (units[i].unitPrice + model['unitItemPrice']).toFixed(2) );
				
				});

				unitCollection.add(units[i].mcollection);
				var mUnit = new App.Models.Unit({
					name:units[i].name,
					mcollection:unitCollection,
					unitPrice: units[i].unitPrice
							
				});
				this.add(mUnit);
				i++;
			}
		},
		updateUnitPrice: function (unitItemCollection) {

			this.each(function (iterator) {
				if (iterator.get('mcollection')===unitItemCollection){
					iterator.set('unitPrice', 0);
					iterator.get('mcollection').each(function (material){
						iterator.set('unitPrice', iterator.get('unitPrice')+material.get('unitItemPrice'));

					});
				}

			})

		}
		
	});

})();