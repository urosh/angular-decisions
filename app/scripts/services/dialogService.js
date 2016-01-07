(function(){
  'use strict';
   angular
    .module('app.services')
    .service('dialogService', function(treeActions, $mdDialog) {
    
      var dialogData = {};

      dialogData[treeActions.newDocument] = {
        'controller'  :   'newDocument',
        'templateUrl' :   'scripts/tree/newDocumentTemplate.html',
        'openFrom'    :   '.mdi-file-document',
        'closeTo'     :   '.mdi-file-document'
      };

      dialogData[treeActions.newTreeItem] = {
        'controller'  :   'newDocument',
        'templateUrl' :   'scripts/tree/newDocumentTemplate.html',
        'openFrom'    :   '.mdi-plus',
        'closeTo'     :   '.mdi-plus'
      };

     


      dialogData[treeActions.addData] = {
        'controller'  :   'addData',
        'templateUrl' :   'scripts/digitalObjects/addDataTemplate.html',
        'openFrom'    :   '.node.selected',
        'closeTo'     :   '.node.selected'
      };

      dialogData[treeActions.editObject] = {
        'controller'  :   'editObject',
        'templateUrl' :   'scripts/digitalObjects/editObjectTemplate.html',
        'openFrom'    :   '.mdi-plus',
        'closeTo'     :   '.mdi-plus'
      };

       

      dialogData[treeActions.deleteObject] = {
        'controller'  :   'deleteObject',
        'templateUrl' :   'scripts/digitalObjects/deleteObjectTemplate.html',
        'openFrom'    :   '.mdi-plus',
        'closeTo'     :   '.mdi-plus'
      };

      dialogData[treeActions.editTreeItem] = {
        'controller'  :   'addStory',
        'templateUrl' :   'scripts/stories/addStoryTemplate.html',
        'openFrom'    :   '.mdi-table-edit',
        'closeTo'     :   '.mdi-table-edit'
      }

      dialogData[treeActions.deleteTreeItem] = {
        'controller'  :   'deleteTreeItem',
        'templateUrl' :   'scripts/tree/deleteTreeItemTemplate.html',
        'openFrom'    :   '.mdi-table-edit',
        'closeTo'     :   '.mdi-table-edit'
      }

      dialogData[treeActions.objectDetails] = {
        'controller'  :   'objectDetails',
        'templateUrl' :   'scripts/digitalObjects/objectDetailsTemplate.html',
        'openFrom'    :   '.mdi-table-edit',
        'closeTo'     :   '.mdi-table-edit'
      }

      var modalStates = []; // here i store modal states 


      this.modalForward = function(item){
        this.dialogManager(treeActions[item.next], item.nextData);
        modalStates.push(item);
      };

      this.modalReverse = function() {
        var item = modalStates.pop();
        if(item){
          this.dialogManager(treeActions[item.current], item.currentData);
        }
      };

      
      this.dialogManager = function(dialogType, obj) {
        var dialog = dialogData[dialogType];
        var locals = obj || {};
        return $mdDialog.show({
          controller: dialog.controller,
          templateUrl: dialog.templateUrl,
          parent: angular.element(document.body),
          locals: locals,
          openFrom: angular.element(document.querySelector(dialog.openFrom)),
          closeTo: angular.element(document.querySelector(dialog.closeTo))
        });
      }


    });
})();
