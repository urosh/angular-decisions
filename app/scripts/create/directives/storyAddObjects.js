(function(){
  'use strict';
  angular
    .module('app.buildDecisions')
    .directive('storyAddObjects', storyAddObjects);
  
  /*@NgInject*/
  function storyAddObjects($compile, storyService, storyMessages, $timeout, decisionFactory) {
    var directive = {
      restrict: 'E',
      controller: Controller,
      controllerAs: 'vm',
      scope: {
        item: '='
      },
      bindToController: true,
      templateUrl: 'scripts/create/templates/storyAddObjects.html'
    };


    var modes = {
      ORIGINAL: 'ORIGINAL',
      ALTERNATIVE: 'ALTERNATIVE'
    };


    

 
    function linkFunction(scope, element) {
      //var blockId = scope.item.id;

      
    };

    
    function Controller($scope) {

      var vm = this;
      vm.blockClicked = blockClicked;
      vm.activeBlock = true;
      var blockId = vm.item.id;
      init();


      function init() {
        storyMessages.blockActive(blockId); 
        storyService.activeBlock(blockId);
        //vm.item.data = [];
      }
      
      
      storyMessages.onAddItem($scope, function(id) {
        if(blockId === storyService.activeBlock()){
          vm.item.data.push(decisionFactory.getObject(id));
        }
      });

      storyMessages.onDeactivateBlocks($scope, function(data) {
        vm.activeBlock = false;
        if(data !== blockId){
          if(vm.item.data.length === 0) {
            console.log('do i remove something/?');
            //storyMessages.removeBlock(blockId);
            //storyService.activeBlock(-1);
          }
        } 
      });

      function blockClicked(id) {
        vm.activeBlock = true;
        storyMessages.blockActive(id);
        storyService.activeBlock(blockId);
      }
      return vm;
    }

    return directive;
  }

})();