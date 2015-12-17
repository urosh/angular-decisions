(function(){
  'use strict';
  angular.module('app.buildDecisions')
    .controller('editNode', editNode);

  /*$ngInject*/
  function editNode($scope, $timeout, $mdDialog, storyService, storyMessages, dialogMessages, decisionFactory,treeItem ) {

    $scope.close = function() {
      saveStory();
      $mdDialog.hide();
    }

    $scope.type = treeItem.type;
    $scope.id = treeItem.id;
    $scope.item = treeItem;
    $scope.storyBlocks = [];
    $scope.appState = '';
    $scope.storyBlocks = storyService.getStoryBlocks(treeItem);
    
    // if we already have some date entered, we want to deactivate any active block 
    // within the story
    if($scope.storyBlocks.length > 0) {
      $timeout(function(){
        storyMessages.deactivateBlocks(-1);
      }, 100)
    }
    
    $scope.addBlock = function(mode) {
      $scope.activeBlockType = mode;
      storyService.addNewBlock(mode);
    }


    storyMessages.onRemoveBlock($scope, function(item) {
      var index;
      $scope.storyBlocks.forEach(function(block, i){
        if(block.id === item) index = i;
      })
      $scope.storyBlocks.splice(index, 1);
    });

    storyMessages.onSaveStory($scope, saveStory);

    function saveStory() {
      var storyData = {
        type: treeItem.type,
        id: treeItem.id,
        temp: true,
        content: []
      };

      $scope.storyBlocks.forEach(function(item) {
        storyData.content.push({
          mode: item.mode,
          data: item.data
        })
      });


      decisionFactory.saveTreeItemStory(storyData);
    }


  }
})();