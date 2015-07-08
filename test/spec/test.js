describe('Controller: AboutCtrl', function () {

  // load the controller's module
  beforeEach(module('app.buildDecisions'));

  beforeEach(module('starcDecisions'));

  var AboutCtrl,
    scope;

  // Initialize the controller and a mock scope
  /*beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AboutCtrl = $controller('AboutCtrl', {
      $scope: scope
    });
  }));*/

  it('should attach a list of awesomeThings to the scope', function () {
    expect(2).toBe(3);
  });
});