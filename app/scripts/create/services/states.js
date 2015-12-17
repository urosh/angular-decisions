(function(){
  'use strict';
  angular.module('app.buildDecisions')
    .factory('appStates', appStates);

  /* @ngInject */
  function appStates() {
    

    var ApplicationModes = {
      START: 'START',
      DOCUMENT: 'DOCUMENT',
      EDIT_NODE: 'EDIT_NODE',
      NODE: 'NODE',
      NODE_TARGET: 'NODE_TARGET',
      CONNECTION: 'CONNECTION',
      ADD_CONNECTION: 'ADD_CONNECTION',
      EDIT_CONNECTION: 'EDIT_CONNECTION',
      ADD_OBJECTS: 'ADD_OBJECTS',
      EDIT_OBJECT: 'EDIT_OBJECT'
    };

    // this should hold id's of the respective object
    // that are stored in the factory. 
    var currentTreeItem, currentObject; 

    currentTreeItem = {
      type: '',
      id: ''
    };

    currentObject = {
      type: '',
      id: ''
    };

    


    
    var states = {
      'applicationMode': ''
    }

    function setApplicationMode(mode) {
      states.applicationMode = mode;
      return mode;
    }

    function getApplicationMode() {
      return states.applicationMode;
    }
    
    // returns id of active node or connection    
    function getCurrentTreeItem(){
      return currentTreeItem;
    }

    function setCurrentTreeItem(item) {
      currentTreeItem = item;
      return currentTreeItem;
    }

   

    function setCurrentObject (item) {
      currentObject = item;
      return currentObject;
    }

    function getCurrentObject() {
      return currentObject;
    }



    var service = {
      states: states,
      ApplicationModes: ApplicationModes,
      setApplicationMode: setApplicationMode,
      getApplicationMode: getApplicationMode,
      setCurrentTreeItem: setCurrentTreeItem,
      getCurrentTreeItem: getCurrentTreeItem,
      //setCurrentObject: setCurrentObject,
      //getCurrentObject: getCurrentObject  
    };

    return service;
  }
})();