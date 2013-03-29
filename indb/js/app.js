$(function(){
	window.App = {
		Models: {},
		Views: {},
		Collections: {}
	};
	
	window.template = function( id ){
		return _.template ( $('#' + id).html() );
	};
	
		
	App.Models.Product = Backbone.Model.extend({
		defaults: {
			material: 'empty',
			price: 0
		},
		validate: function ( attrs ) {
			if  ( ! $.trim ( attrs.material ) ){
				return "write material";
			};
			if  ( ! $.trim( attrs.price ) || $.trim( attrs.price ) < 0 ){
				return "must be positive";
			}
		}
	});
	
	
	
	
	App.Views.Product = Backbone.View.extend({
		initialize: function() {
			this.model.on( 'change', this.render, this);
			this.model.on( 'destroy ', this.remove, this);
		},
		
		tagName: 'li',
		template: template( 'productTemplate' ),
		render: function () {
			var template = this.template( this.model.toJSON() );
			this.$el.html( template );
			return this;
		},
		
		events: {
			'dblclick .mat' : 'editProduct',
			'dblclick .pr'   : 'editPrice',
			'click .delete' : 'deleteProduct',
		},
		
		editPrice: function () {
			var editPrice = prompt("write new price", this.model.get('price'));
			this.model.set( 'price', editPrice );
		},
		
		editProduct: function() {
			
			var editMaterial = prompt("write new material", this.model.get('material'));
			this.model.set('material', editMaterial);
	
		},
		
		deleteProduct: function () {
			var materialBD = this.model.get('material');
			this.model.destroy();
			console.log( productsCollection );
			deleteProduct(materialBD);
		},
		remove: function() {
			this.$el.remove();
			
		}
		
	});
	
	App.Collections.Product = Backbone.Collection.extend({
	
	model: App.Models.Product
	});
	
	App.Views.Products = Backbone.View.extend({
		tagName: 'ul',
		
		initialize: function() {
			this.collection.on('add', this.addOne, this)
		},
		
		render: function () {
			this.collection.each( this.addOne, this );
			return this;
		},
		
		addOne: function(Product) {
			var productView = new App.Views.Product({ model: Product });
			
			this.$el.append(productView.render().el);		
		}
		
	});
	
	App.Views.AddProduct = Backbone.View.extend({
		el: '#productAdd',
		
		events: {
			'click #add' : 'addProductItem'
		},
		
		initialize: function () {
			
		},
		
		addProductItem: function(e) {
			
			var newMaterial = $('#product').val();
			var newPrice = $('#productPrice').val();
		
			var newProduct = new App.Models.Product({ material: newMaterial, price: newPrice });
			this.collection.add(newProduct); 
			//add to bd
			addProduct(newMaterial, newPrice);
			
			}
		
	});
	
	//collection
	window.productsCollection = new App.Collections.Product([
						
	]);
	 //var productM = new App.Models.Product;
	var addProductView = new App.Views.AddProduct({ collection: productsCollection  });
	
	var productsView = new App.Views.Products({ collection: productsCollection });
	
	$('.products').html(productsView.render().el);
	
	
});