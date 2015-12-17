(function(){
  'use strict';
  angular.module('app.buildDecisions')
    .factory('storyService', storyService);

  /* @ngInject */
  function storyService(_, decisionFactory) {
    

    var ApplicationModes = {
      ADD_TEXT: 'ADD_TEXT',
      ADD_OBJECTS: 'ADD_OBJECTS',
      ADD_VIDEO: 'ADD_VIDEO',
      ADD_LINK: 'ADD_LINK',
      ADD_TITLE: 'ADD_TITLE',
    };
    var blockId = 0;
    var domData = {};
    var activeBlockId = -1;
    domData[ApplicationModes.ADD_TEXT] = '<story-add-text item="item"></story-add-text>';
    domData[ApplicationModes.ADD_TITLE] = '<story-add-title item="item"></story-add-title>';
    //domData[ApplicationModes.ADD_OBJECTS] = '<story-add-objects item="item"></story-add-objects>';
    domData[ApplicationModes.ADD_OBJECTS] = '<story-add-objects item="item"></story-add-objects>';
    domData[ApplicationModes.ADD_VIDEO] = '<story-add-video item="item"></story-add-video>';
    domData[ApplicationModes.ADD_LINK] = '<story-add-link item="item"></story-add-link>';

    var modes = {
      ORIGINAL: 'ORIGINAL',
      ALTERNATIVE: 'ALTERNATIVE'
    };
    
   

    var storyBlocks = [];
    function setApplicationMode(mode) {
      state = mode;
      return state;  
    }

    function getApplicationMode() {
      return state;
    }
    

    

    function getBlockData(id) {
      return (_.find(storyBlocks, function(block) {

        return block.id ===  id;
      }));
       
    }

    function removeBlock(id) {
      var index;
      storyBlocks.forEach(function(block, i) {
        if(id === block.id) {
          index = i;
        }
      });
      storyBlocks.splice(index, 1);
      return _.cloneDeep(storyBlocks);
      
    }

    function setBlockMode(id) {

    }

    function getBlockMode(id) {
      return (_.find(storyBlocks, function(block) {
        return block.id ===  id;
      }));
    }

    function activeBlock(id) {
      if (typeof id !== 'undefined') {
        activeBlockId = id;
      }
      return activeBlockId;
    }


    function addNewBlock(mode) {
      var newBlock = {
        data: '',
        id: blockId++,
        template: domData[mode],
        mode: mode
      };
      if (mode === ApplicationModes.ADD_LINK) { newBlock.data = 'http://'; };
      if (mode === ApplicationModes.ADD_OBJECTS) { newBlock.data = []; }
      
      if(activeBlockId === -1) {
        storyBlocks.push(newBlock);
      }else{
        var currentIndex = _.findIndex(storyBlocks, function(block) {
          return block.id === activeBlockId;
        });
        storyBlocks.splice(currentIndex + 1, 0, newBlock);
      }
    }

    function getStoryBlocks(treeItem) {
      storyBlocks = [];
      var stories = decisionFactory.getTreeItemStories(treeItem);
      
      stories.forEach(function(story) {
        var storyInfo = {
          id: 0,
          template: domData[story.mode],
          data: story.data,
          mode: story.mode
        };
        if(story.mode === 'ADD_OBJECTS') {
          storyInfo.data = [];
          story.data.forEach(function(item) {
            storyInfo.data.push(decisionFactory.getObject(item));
          });
        }
        storyBlocks.push(storyInfo);
      });

      return storyBlocks;
      
    }
    var service = {
      ApplicationModes: ApplicationModes,
      addNewBlock: addNewBlock,
      getBlockData: getBlockData,
      removeBlock: removeBlock,
      activeBlock: activeBlock,
      getStoryBlocks: getStoryBlocks
    };

    return service;
  }
})();