(function(){
  'use strict';
  angular
    .module('app.stories')
    .directive('storyAddTitle', storyAddTitle);
  
  /*@NgInject*/
  function storyAddTitle($compile, storyService, storyMessages, $timeout) {
    var directive = {
      controller: Controller,
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
        item: '='
      },
      bindToController: true,
      //link: linkFunction,
      template: '<div ng-class="{\'activeBlock\': vm.activeBlock}"><input ng-blur="vm.deactivateBlock()" ng-show="vm.mode===\'ORIGINAL\'"  type="text" ng-model="vm.item.data"></input><h2 ng-click="vm.activateBlock()" ng-show="vm.mode===\'ALTERNATIVE\'">{{vm.item.data}}</h2></div>',
    };


    var modes = {
      ORIGINAL: 'ORIGINAL',
      ALTERNATIVE: 'ALTERNATIVE'
    };


    function Controller($scope) {
      var vm = this;
      vm.activateBlock = activateBlock;
      vm.deactivateBlock = deactivateBlock;
      vm.activeBlock = false;
      var blockId = vm.item.id;
      
      
      init();

      function init() {
        vm.mode = modes.ORIGINAL;
        storyService.activeBlock(blockId);
        storyMessages.deactivateBlocks(blockId);
        vm.activeBlock = true;
      }

      function activateBlock() {
        if(vm.mode === modes.ALTERNATIVE){
          init();
        }
      }


      function deactivateBlock() {
        vm.mode = modes.ALTERNATIVE;
        vm.activeBlock = false;
        if(vm.item.data === '') {
          storyMessages.removeBlock(blockId);
          storyService.activeBlock(-1);
        }
      }

      storyMessages.onDeactivateBlocks($scope, function(data) {
        if(data !== blockId){
          deactivateBlock();
        }
      });

      return vm;


    }
 
    
    


    return directive;
  }

})();