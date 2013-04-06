[1mdiff --git a/main/js/collections.js b/main/js/collections.js[m
[1mindex 1b0c28b..99e4b63 100644[m
[1m--- a/main/js/collections.js[m
[1m+++ b/main/js/collections.js[m
[36m@@ -64,7 +64,7 @@[m [mvar App = App || {};[m
 		},[m
 		deleteModel: function( model ) {[m
 		[m
[31m-			model.destroy();[m
[32m+[m			[32mthis.destroy();[m
 			[m
 		}[m
 	[m
[1mdiff --git a/main/js/views.js b/main/js/views.js[m
[1mindex 75a0907..6921b94 100644[m
[1m--- a/main/js/views.js[m
[1m+++ b/main/js/views.js[m
[36m@@ -201,7 +201,7 @@[m [mvar App = App || {};[m
 		events: {[m
 			'click .unit_name' : 'unitToggle',[m
 			'click .add_unitItem' : 'unitAddItem',[m
[31m-			'click .delete_unit' : 'unitDeleteItem'[m
[32m+[m			[32m'click .delete_unit' : 'unitRemoveItem'[m
 		},[m
 		template: _.template( $('#unit-name').html() ),[m
 		render: function () {	      [m
