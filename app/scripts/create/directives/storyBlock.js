(function(){
  'use strict';
  angular
    .module('app.buildDecisions')
    .directive('storyBlock', storyBlock);
  
  /*@NgInject*/
  function storyBlock($compile, storyService, storyMessages, $timeout) {
    var directive = {
      //controller: 'Controller',
      //controllerAs: 'vm',
      restrict: 'E',
      scope: {
        item: '='
      },
      //scope: true,
      link: linkFunction,
      template: '<div class="storyBlockDiv"></div>',
      
    };

    
    
    
    
    function linkFunction(scope, element) {
      var content,
        domData; 

      scope.block = {
        data : scope.item.data
      };
      var domData = storyService.getBlockData(scope.item.id);
      //var domData = storyService.getBlockData(0);
      // Removing all contents and old listeners
      //element.contents().remove();
      // Creating a new element
      // element.html( domData.template);
      // Adding new listeners
      //$compile(element.contents())(scope);

      //scope = element.scope();
      //scope = element.isolateScope();
      var linkFn = $compile(domData.template);
      content = linkFn(scope);
      element.children(0).append(content);

      //scope = element.isolateScope();

    };

    


    return directive;
  }

})();