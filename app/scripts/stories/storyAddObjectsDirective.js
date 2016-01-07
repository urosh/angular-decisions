(function(){
  'use strict';
  angular
    .module('app.stories')
    .directive('storyAddObjects', storyAddObjects);
  
  /*@NgInject*/
  function storyAddObjects($compile, storyService, appStates, storyMessages, $timeout, decisionFactory, dialogService) {
    var directive = {
      restrict: 'E',
      controller: Controller,
      controllerAs: 'vm',
      scope: {
        item: '='
      },
      bindToController: true,
      templateUrl: 'scripts/stories/storyAddObjectsTemplate.html'
    };


    var modes = {
      ORIGINAL: 'ORIGINAL',
      ALTERNATIVE: 'ALTERNATIVE'
    };

    
    function Controller($scope) {

      var vm = this;
      vm.blockClicked = blockClicked;
      vm.removeObject = removeObject;
      vm.showDetails = showDetails;
      var blockId = vm.item.id;
      init();


      function init() {
        
        storyMessages.deactivateBlocks(blockId);
        storyService.activeBlock(blockId);
        vm.activeBlock = true;
        //vm.item.data = [];
      }
      
      
      storyMessages.onAddItem($scope, function(id) {
        if(blockId === storyService.activeBlock()){
          if( (_.findIndex(vm.item.data, function(item){
            return item.id === id;
          })) === -1){
            vm.item.data.push(decisionFactory.getObject(id));
          }
        }
      });

      storyMessages.onDeactivateBlocks($scope, function(data) {
        if(data !== blockId){
          deactivateBlock();
        } 
      });
      
      function deactivateBlock() {
        vm.mode = modes.ALTERNATIVE;
        vm.activeBlock = false;
        if(vm.item.data.length === 0) {
          storyMessages.removeBlock(blockId);
          storyService.activeBlock(-1);
        }
      }

      function showDetails(id) {
        storyMessages.saveStory();
        dialogService.modalForward({
          'current': 'editTreeItem',
          'currentData': {
            treeItem: appStates.getCurrentTreeItem()

          },
          'next': 'objectDetails',
          'nextData': {
            id: id  
          }
        });
      }

      function removeObject(id) {
        var objectIndex;
        vm.item.data.forEach(function(object, index) {
          if(id === object.id) { objectIndex = index};
        })
        vm.item.data.splice(objectIndex, 1);
      }


      function blockClicked(id) {
        init();
      }

      return vm;
    }

    return directive;
  }

})();