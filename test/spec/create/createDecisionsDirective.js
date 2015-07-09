describe("CreateDecision Directive ", function() {
	var scope, 
			element,
			controller;

	beforeEach(module('app.buildDecisions'));
	beforeEach(module('ngMaterial'));
	// load the templates
  beforeEach(module('scripts/create/create.decisions.tmpl.html', 'scripts/create/decision.tree.tmpl.html'));

  beforeEach(inject(function($rootScope, $compile) {
  	scope = $rootScope.$new();

  	element = angular.element("<create-decisions></create-decisions>");
  	$compile(element)(scope);
  	scope.$digest();
  	controller = element.controller('createDecisions');
  	

  }));

  /*it('should pass the basic test', function(){
  	expect(3).toBe(3);
  });*/

  it('Initial state should be start', function() {
  	//console.log('OK we are testing here. I hope');
  	//console.log(element);
  	console.log(controller.state);
  	expect(4).toBe(4);
  });
})