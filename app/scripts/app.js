(function(){
	"use strict";
	angular.module('starcDecisions', [
			'ui.router',
			'ngMaterial'
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
			.state('login', {
				url: '/login',
				views: {
					'topbar@': {
						templateUrl: 'scripts/home/topbar.tmpl.html',
					},
			
					'content@': {
						controller: 'LoginCtrl as vm',
						templateUrl: 'scripts/authentication/login.tmpl.html',
					}
				}
				
        
			})
			.state('register', {
				url: '/register',
				views: {
					'topbar@': {
						templateUrl: 'scripts/home/topbar.tmpl.html',
					},
			
					'content@': {
						controller: 'RegisterCtrl as vm',
						templateUrl: 'scripts/authentication/register.tmpl.html',
					}
				}
			});
	}
		
	  
})();