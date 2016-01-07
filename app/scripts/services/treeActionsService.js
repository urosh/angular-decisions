(function(){
  'use strict';
  angular
    .module('app.services')
    .service('treeActions', function() {
      this.newDocument = 'NEW_DOCUMENT';
      
      this.newTreeItem = 'NEW_TREE_ITEM';
      this.editTreeItem = 'EDIT_TREE_ITEM';
      this.deleteTreeItem = 'DELETE_TREE_ITEM';
      
      this.addData = 'ADD_DATA';
      
      this.deleteObject = 'DELETE_OBJECT';
      this.editObject = 'EDIT_OBJECT';
      this.deleteObject = 'DELETE_OBJECT';  
      this.objectDetails = 'OBJECT_DETAILS';
      
    });
})();