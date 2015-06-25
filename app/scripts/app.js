(function(){
	"use strict";
	angular.module('starcDecisions', [
			'ui.router',
			'ngMaterial',
			'buildDecisions'
		]);

	angular.module('starcDecisions')
  	.constant('API_URL', 'http://starc-srv.cyi.ac.cy/api');

  
  angular.module('starcDecisions')
		.config(AppStates);

	AppStates.$inject = ['$stateProvider', '$urlRouterProvider'];

	function AppStates($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise("/");
		$stateProvider
			.state('home', {
				url: '/',
				views: {
					
					'content@': {
						templateUrl: 'scripts/home/home.tmpl.html',
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
						templateUrl: 'scripts/create/create.tmpl.html',
					}
				}
				
        
			})
			
	}
		
	  
})();