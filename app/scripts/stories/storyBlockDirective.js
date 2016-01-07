(function(){
  'use strict';
  angular
    .module('app.stories')
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
      var linkFn = $compile(domData.template);
      content = linkFn(scope);
      element.children(0).append(content);

      //scope = element.isolateScope();

    };

    


    return directive;
  }

})();