(function(){
  'use strict';
  angular.module('app.buildDecisions')
    .controller('addData', addData);

  /* @ngInject */
  function addData($scope, decisionFactory, Upload, $mdDialog, dialogMessages, appStates) {
    
    // snapshot of states. 
    var currentTreeItem = {
      type: appStates.getCurrentTreeItem().type,
      id: appStates.getCurrentTreeItem().id
    };

    $scope.close = function() {
      $mdDialog.cancel();
    }
    // ok here i need a list of objects associated with the given node. Initialy there are none, 
    // but as we upload objects, they are added to the node. Information about this is stored 
    // in decision factory.

    // how to get list of objects associated to a node or connection. I need a query
    $scope.objects = decisionFactory.getObjectList(currentTreeItem);
    //$scope.objects = objects || [];
    $scope.submit = function() {
      if (form.file.$valid && $scope.file && !$scope.file.$error) {
        $scope.upload($scope.file);
      }
    }

    $scope.saveObjects = function() { 
      // here i should send data to server, objects itself should already be stored in factory
      //decisionFactory.addDataToNode($scope.objects);
      $mdDialog.hide($scope.objects);
    };

    /* Editing an object */
    $scope.editObject = function(type, index) {
      var nextItem = (type === 'image') ? 'editImage' : 'edit3D';
      /*appStates.setCurrentObject({
        type: type,
        id: $scope.objects[index].id
      });*/

      dialogMessages.modalForward({
        'current': 'addDataToNode',
        'next': nextItem,
        'nextData': {
          currentObject: {
            type: type,
            id: $scope.objects[index].id
          }
        },
        
      });
    }

    $scope.removeObject = function(index) {
      //decisionFactory.setActiveObject($scope.objects[index]);
      dialogMessages.modalForward({
        'current': 'addDataToNode',
        'next': 'deleteObject',
        'nextData': {
          id: $scope.objects[index].id 
        } 
      });
    }

    $scope.progressPercentage = 0;
    $scope.upload = function (file) {
      if(file){

        $scope.objects.push({
          'fileName': '',
          'progressPercentage': 0,
          'thumbnail': '',
          'fileLocation': '',
          'status': '',
          'completed': false
        });

        Upload.upload({
          url: 'http://public.cyi.ac.cy/starcRepo/decisions/upload',
          method: 'POST',
          file: file,
          sendFieldsAs: 'form',
        }).progress(function (evt) {
            if(evt.config._file){
              $scope.objects[$scope.objects.length - 1]['fileName'] = evt.config._file.name;
              $scope.objects[$scope.objects.length - 1]['progressPercentage'] = parseInt(100.0 * evt.loaded / evt.total);;
            }
        }).success(function (data, status, headers, config) {

            var currentIndex = $scope.objects.length -1;
            $scope.objects[currentIndex]['width'] = data.width || '';
            $scope.objects[currentIndex]['height'] = data.height || '';
            $scope.objects[currentIndex]['id'] = data.docID || '';
            $scope.objects[currentIndex]['format'] = data.format || '';
            $scope.objects[currentIndex]['thumbnail'] = data.thumbnail || '';
            $scope.objects[currentIndex]['completed'] = true;
            $scope.objects[currentIndex]['status'] = 'ok';  
            $scope.objects[currentIndex]['fileLocation'] = data.fileLocation;
            $scope.objects[currentIndex]['type'] = data.type;
            decisionFactory.addObjectToTree(currentTreeItem, $scope.objects[currentIndex]);

        }).error(function (data, status, headers, config) {
            $scope.objects.splice($scope.objects.length-1, 1);
            console.log('There was an error while uploading the file');
        })
        
      }
    }
  }
})();