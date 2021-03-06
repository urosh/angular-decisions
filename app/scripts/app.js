(function(){
	"use strict";
	angular.module('starcDecisions', [
			'ui.router',
			'ngMaterial',
			'app.stories',
			'app.services',
			'app.treeModule',
			'app.digitalObjects',
			'ngMessages',
			'firebase'
		]);

	angular.module('starcDecisions')
  	.constant('API_URL', 'http://starc-srv.cyi.ac.cy/api');

  
  angular.module('starcDecisions')
		.config(AppStates);


	angular.module('starcDecisions')
  	.constant('_', _);

	AppStates.$inject = ['$stateProvider', '$urlRouterProvider'];
	
	
	function AppStates($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise("/");
		$stateProvider
			.state('home', {
				url: '/',
				views: {
					
					'content@': {
						templateUrl: 'scripts/home/home.tmpl.html'
						
						
					}
				}
				
				
			})
			.state('explore', {
				url: '/explore',
				views: {
					
					'content@': {
						//controller: 'LoginCtrl as vm',
						templateUrl: 'scripts/explore/explore.tmpl.html',
					}
				}
				
        
			})
			.state('create', {
				url: '/create',
				views: {
					
					'content@': {
						//controller: 'LoginCtrl as vm',
						template: '<create-decisions></create-decisions>',
					}
				}
				
        
			});

			
			
	}
		
	  
})();