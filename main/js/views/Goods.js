var App = App || {};

(function () {

	App.Views.Goods = Backbone.View.extend({
	
			
		tagName: 'li',
		initialize: function () {
			this.model.on( 'change', this.render, this);
			this.model.on( 'destroy', this.goodsRemoveItem, this );

		},
		
		events: {
			'click .goods_name' : 'goodsToggle',
			'click .deleteGoods' : 'goodsDeleteItem',
			'click .edit_goodsItem' : 'changeGoodsName',
			'keypress .edit_goods_name': 'updateOnEnter',
			'blur .edit_goods_name': 'close'
		},
		template: _.template( $('#goods-name').html() ),
		render: function () {	
			var strTemplate = this.template( this.model.toJSON() );
			this.$el.html( strTemplate );
			var newGoodsItemsList = new App.Views.GoodsItemsList( { collection: this.model.get( 'goodsCollection' ), model: this.model  } ) ;
			this.$('.goods_info').append( newGoodsItemsList.el );
			newGoodsItemsList.render();
			this.$input = this.$('.edit_goods_name');
			
		}, 
		goodsToggle: function () {
			
			var jq_goods_holder = '.goods_holder';
			var jq_goods_info = '.goods_info';
			var jq_visible = ':visible';
			var jq_AddUnitsList = '.AddUnitsList';
			
			this.$( jq_goods_info ).toggle();
			
			if ( this.$( jq_goods_info ).is( jq_visible ) === true ) {
			
				$ ( jq_goods_info ).hide();
				this.$( jq_goods_info ).show();
				
				var AddUnitsList = new App.Views.AddUnitsList( { collection: App.Units, model : this.model	} );

				AddUnitsList.render();
				
				$( jq_AddUnitsList ).html('');
				$( jq_AddUnitsList ).append( AddUnitsList.el );
				
				$(  jq_AddUnitsList  ).show();	
					var positionTop = this.$( jq_goods_holder ).position().top;
					var positionLeft = this.$( jq_goods_info ).position().left + 530;
				$(  jq_AddUnitsList  ).css ( { 'top' : positionTop,  'left' : positionLeft } ); 
				
			} else {
			
				$(  jq_AddUnitsList  ).hide();
			
			}
			
		},
		goodsDeleteItem: function() {
		
			if ( confirm('Are you sure you want to delete this Goods?') ) {
				App.Events.trigger( 'goodsDelete', this.model );
			}
		
		},
		goodsRemoveItem: function() {
		
			this.$el.remove();
			$('.AddUnitsList').hide();
	
		},
		changeGoodsName: function () {
			this.$el.addClass('editing');
			this.$input.focus();
			
		},
		close: function () {
			var value = this.$input.val().trim();
			if ( value =='' ) {
			this.$el.removeClass('editing');
			return;
			};
			if  ( ! value ) {
			this.$el.removeClass('editing');
			return;
			}
			App.Events.trigger('editGoodsName', this.model, value);
			this.$el.removeClass('editing');
		},
		updateOnEnter: function (e) {
			if (e.keyCode == 13) {
				this.close(); 
			}
		},
		
		
		
	});
	
	App.Views.GoodsList = Backbone.View.extend({  // это вид коллекции
	
	
		tagName: 'ul',
	
		initialize: function () {
			this.collection.on('add', this.render, this);
		},
		render: function () {
				
            this.$el.html('');
          	this.collection.each( this.addOne, this );
			return this;
			
		},
		addOne: function( modelGoods ) {
			
			var GoodsView = new App.Views.Goods({ model: modelGoods });
			this.$el.prepend( GoodsView.el );
			
			GoodsView.render();
			
			var jq_goods_info = '.goods_info';
			this.$el.find( jq_goods_info ).hide();

		}
			
		
	});

}());