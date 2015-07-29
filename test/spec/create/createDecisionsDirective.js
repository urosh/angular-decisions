describe("CreateDecision Directive ", function() {
	var scope, 
			element,
			controller;

	beforeEach(module('app.buildDecisions'));
	beforeEach(module('ngMaterial'));
	// load the templates
  //beforeEach(module('scripts/create/create.decisions.tmpl.html', 'scripts/create/decision.tree.tmpl.html'));
  beforeEach(module('app.tmpl'));
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
  	
  	expect(controller.state).toBe("_START_");
  	//expect(4).toBe(4);
  });

  it('Selecting a node should change the state to _NODE_ ', function() {
  	controller.selectNode();
  	expect(controller.state).toBe("_NODE_");
  });

  it('Selecting node connection should change the state to _NODE_TARGET_', function() {
  	controller.connectNode();
  	expect(controller.state).toBe("_NODE_TARGET_");
  });

  it('Selecting a node with _NODE_TARGET_ state should create new connection', function() {
  	controller.state = "_NODE_TARGET_";
  	controller.selectNode();
  	
  })
})