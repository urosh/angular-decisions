(function(){
  'use strict';
  angular
    .module('app.stories')
    .directive('storyAddVideo', storyAddVideo);
  
  /*@NgInject*/
  function storyAddVideo($compile, storyService, storyMessages, $timeout) {
    var directive = {
      controller: Controller,
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
        item: '='
      },
      bindToController: true,
      //link: linkFunction,
      template: '<div ng-class="{\'activeBlock\': vm.activeBlock}" ng-click="vm.activateBlock()"><input ng-blur="vm.deactivateBlock()" type="text" ng-show="vm.mode === \'ORIGINAL\'" ng-model="vm.item.data"></input><youtube-video video-url="vm.item.data" ng-if="vm.mode === \'ALTERNATIVE\'" player-width="\'100%\'" ></youtube-video></div>',
    };

    function Controller($scope) {
      var vm = this;
      vm.activateBlock = activateBlock;
      vm.deactivateBlock = deactivateBlock;
      vm.activeBlock = false;
      var blockId = vm.item.id;
      vm.videoUrl = 'https://www.youtube.com/watch?v=JE4ja5oErfA';
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
        console.log('i get here?');
        vm.mode = modes.ALTERNATIVE;
        vm.activeBlock = false;
        if(vm.item.data === '') {
          storyMessages.removeBlock(blockId);
          storyService.activeBlock(-1);
        }else{

        } 
      }

      storyMessages.onDeactivateBlocks($scope, function(data) {
        if(data !== blockId){
          deactivateBlock();
        } 
      });



      return vm;
    }


    var modes = {
      ORIGINAL: 'ORIGINAL',
      ALTERNATIVE: 'ALTERNATIVE'
    };


    var templates = {};
    templates[modes.ORIGINAL] = '<input type="text" ng-model="block.data"></input>';
    templates[modes.ALTERNATIVE] = '<youtube-video video-url="videoUrl"></youtube-video>';

 
    function linkFunction(scope, element) {
      var mode = modes.ORIGINAL;
      var content;

      scope.block = {
        data : scope.item.data
      };
      var blockId = scope.item.id;
      scope.videoUrl = '';
      updateDom();
      storyMessages.blockActive(blockId);
      storyMessages.onDeactivateBlocks(scope, function(data) {
        if(data !== blockId && mode === modes.ORIGINAL){
          // change mode
          if(scope.block.data === '') {
            // remove this block;
            storyMessages.blockActive(-1);
            storyMessages.removeBlock(blockId);
          }else{
            mode = modes.ALTERNATIVE;
            updateDom(scope, element);
          }
        } 
      });

      
      function updateDom() {
        //$timeout(function() {
          element.children(0).remove();
          var linkFn = $compile(templates[mode]);
          content = linkFn(scope);
          element.append(content);
          addEventListeners();
        //}, 50);
      }

      function addEventListeners() {
        

        content.on('blur', function() {
          if(mode === modes.ORIGINAL) {
            mode = modes.ALTERNATIVE;
            if(scope.block.data === '') {
              storyMessages.removeBlock(blockId);
            }else{
              updateDom(scope, element);
              scope.videoUrl = scope.block.data;
            }
            scope.$apply();
          }
        });
      }

    };

    


    return directive;
  }

})();