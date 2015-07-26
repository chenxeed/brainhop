// requirejs config
require.config({
	shim: {
		'bootstrap' : {
			deps : ['jquery']
		}
	},
	paths: {
		// library
		'jquery' : '/components/jquery/dist/jquery.min',
		'bootstrap' : '/components/bootstrap/dist/js/bootstrap.min',
		// page
		'index' : '/javascripts/pages/index'
	}
});

// load main javascript libraries and determine the javascript page based on pathname
require(['jquery', 'bootstrap'], function(){
	// Set the alias of javascript page paths based on url pathname
	var routes = {
		'/' : 'index'
	};

	var page_js = routes[window.location.pathname];
	if( page_js ){
		require([page_js], function(){
			console.log('js file of page '+page_js+' loaded');
		});
	}
});