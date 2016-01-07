(function(){
  'use strict';
  angular
    .module('app.treeModule')
    .service('treeActions', function() {
      this.newDocument = 'NEW_DOCUMENT';
      this.newNode = 'NEW_NODE';
      this.newConnection = 'NEW_CONNECTION';
      this.addDataToNode = 'NODE_ADD_DATA';
      this.addDataToConnection = 'CONNECTION_ADD_DATA';
      this.editNode = 'EDIT_NODE';
      this.deleteNode = 'DELETE_NODE';
      this.editConnection = 'EDIT_CONNECTION';
      this.removeObject = 'REMOVE_OBJECT';
      this.removeNode = 'REMOVE_NODE';
      this.removeConnection = 'REMOVE_CONNECTION';
      this.editImage = 'EDIT_IMAGE';
      this.edit3D = 'EDIT_3D';
      this.deleteObject = 'DELETE_OBJECT';
      this.objectDetails = 'OBJECT_DETAILS';
      
    });
})();