(function(){
  'use strict';
  angular
    .module('app.buildDecisions')
    .directive('storyAddText', storyAddText);
  
  /*@NgInject*/
  function storyAddText($compile, storyService, storyMessages, $timeout) {
    var directive = {
      controller: Controller,
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
        item: '=',
      },
      bindToController: true,
      //link: linkFunction,
      template: '<div ng-class="{\'activeBlock\': vm.activeBlock}" ><textarea ng-blur="vm.deactivateBlock()"  ng-show="vm.mode === \'ORIGINAL\'"  ng-model="vm.item.data" ></textarea><div ng-show="vm.mode === \'ALTERNATIVE\'" ng-click="vm.activateBlock()">{{vm.item.data}}</div></div>',
      
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