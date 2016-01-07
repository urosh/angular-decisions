(function(){
  'use strict';

  angular.module('app.stories')
    .factory('storyMessages', StoryMessages);

  StoryMessages.$inject = ['$rootScope'];

  function StoryMessages($rootScope){
    var BLOCK_ADDED = 'BLOCK_ADDED';
    var REMOVE_BLOCK = 'REMOVE_BLOCK';
    var ACTIVE_BLOCK = 'ACTIVE_BLOCK';
    var SHOW_OBJECT_DETAILS = 'SHOW_OBJECT_DETAILS';
    var ADD_ITEM = 'ADD_ITEM';
    var SAVE_STORY = 'SAVE_STORY';

    function deactivateBlocks(item) {
      $rootScope.$broadcast(BLOCK_ADDED, item);
    }

    function onDeactivateBlocks($scope, handler) {
      $scope.$on(BLOCK_ADDED, function(event, args) {
        handler(args);
      });
    }

    function removeBlock(item) {
      $rootScope.$broadcast(REMOVE_BLOCK, item);
    }

    function onRemoveBlock($scope, handler) {
      $scope.$on(REMOVE_BLOCK, function(event, args) {
        handler(args);
      });
    }

    function blockActive(item) {
      $rootScope.$broadcast(ACTIVE_BLOCK, item);
    }

    function onBlockActive($scope, handler) {
      $scope.$on(ACTIVE_BLOCK, function(event, args) {
        handler(args);
      })
    }

    function showObjectDetails(id) {
      $rootScope.$broadcast(SHOW_OBJECT_DETAILS, id);
    }

    function onShowObjectDetails($scope, handler) {
      $scope.$on(SHOW_OBJECT_DETAILS, function(event, args) {
        handler(args);
      })
    }

    function addItem(id) {
      $rootScope.$broadcast(ADD_ITEM, id);
    }

    function onAddItem($scope, handler) {
      $scope.$on(ADD_ITEM, function(event, args) {
        handler(args);
      })
    }

    function saveStory() {
      $rootScope.$broadcast(SAVE_STORY); 
    };

    function onSaveStory($scope, handler) {
      $scope.$on(SAVE_STORY, function(event) {
        handler();
      })
    };


   


    return {
      deactivateBlocks: deactivateBlocks,
      onDeactivateBlocks: onDeactivateBlocks, 
      removeBlock: removeBlock,
      onRemoveBlock: onRemoveBlock,
      blockActive: blockActive,
      onBlockActive: onBlockActive,
      showObjectDetails: showObjectDetails,
      onShowObjectDetails: onShowObjectDetails,
      addItem: addItem,
      onAddItem: onAddItem,
      saveStory: saveStory,
      onSaveStory: onSaveStory
    }



    


    

    
  };

})();
