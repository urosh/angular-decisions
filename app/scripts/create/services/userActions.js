(function(){
  'use strict';
  angular
    .module('app.buildDecisions')
    .service('userActions', function() {
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
      var dialogData = {};

      dialogData['NEW_DOCUMENT'] = {
        'controller'  :   'newDocument',
        'templateUrl' :   'scripts/create/templates/newDocumentDialog.html',
        'openFrom'    :   '.mdi-file-document',
        'closeTo'     :   '.mdi-file-document'
      };

      dialogData['NEW_NODE'] = {
        'controller'  :   'newDocument',
        'templateUrl' :   'scripts/create/templates/newDocumentDialog.html',
        'openFrom'    :   '.mdi-plus',
        'closeTo'     :   '.mdi-plus'
      };

      dialogData['NEW_CONNECTION'] = {
        'controller'  :   'newDocument',
        'templateUrl' :   'scripts/create/templates/newDocumentDialog.html',
        'openFrom'    :   '.mdi-plus',
        'closeTo'     :   '.mdi-plus'
      };


      dialogData['NODE_ADD_DATA'] = {
        'controller'  :   'addData',
        'templateUrl' :   'scripts/create/templates/addDataDialog.html',
        'openFrom'    :   '.node.selected',
        'closeTo'     :   '.node.selected'
      };

      dialogData['EDIT_IMAGE'] = {
        'controller'  :   'editObject',
        'templateUrl' :   'scripts/create/templates/editObjectDialog.html',
        'openFrom'    :   '.mdi-plus',
        'closeTo'     :   '.mdi-plus'
      };

       dialogData['EDIT_3D'] = {
        'controller'  :   'editObject',
        'templateUrl' :   'scripts/create/templates/editObjectDialog.html',
        'openFrom'    :   '.mdi-plus',
        'closeTo'     :   '.mdi-plus'
      };


      dialogData['DELETE_OBJECT'] = {
        'controller'  :   'deleteObject',
        'templateUrl' :   'scripts/create/templates/deleteObjectDialog.html',
        'openFrom'    :   '.mdi-plus',
        'closeTo'     :   '.mdi-plus'
      };

      dialogData['EDIT_NODE'] = {
        'controller'  :   'editNode',
        'templateUrl' :   'scripts/create/templates/editNodeDialog.html',
        'openFrom'    :   '.mdi-table-edit',
        'closeTo'     :   '.mdi-table-edit'
      }

      dialogData['DELETE_NODE'] = {
        'controller'  :   'deleteNode',
        'templateUrl' :   'scripts/create/templates/deleteNodeDialog.html',
        'openFrom'    :   '.mdi-table-edit',
        'closeTo'     :   '.mdi-table-edit'
      }






      
      

      this.getDialogData = function(actionType) {
        return dialogData[actionType]
      }
    });
})();