(function(){
	"use strict";
	angular.module('starcDecisions', [
			'ui.router',
			'ngMaterial',
			'app.buildDecisions',
			'ngMessages'
		]);

	angular.module('starcDecisions')
  	.constant('API_URL', 'http://starc-srv.cyi.ac.cy/api');

  
  angular.module('starcDecisions')
		.config(AppStates);

	AppStates.$inject = ['$stateProvider', '$urlRouterProvider'];
	
	angular.module('starcDecisions')
		.controller('Ajme', function($scope){
			var vm = this;
			console.log('ok ');
			vm.uros = "AIAOAO";

			//return vm;
			$scope.$watch('selectedIndex', function(current, old){
				console.log('ok we are changing tab');
				console.log(current);
			});
		});

	function Ajme() {
		console.log('ajme')
	}
	function AppStates($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise("/");
		$stateProvider
			.state('home', {
				url: '/',
				views: {
					
					'content@': {
						templateUrl: 'scripts/home/home.tmpl.html',
						controller: 'Ajme as vm',
						
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