(function(){
  'use strict';
  angular.module('app.buildDecisions')
    .controller('edit3D', edit3D);

  /* @ngInject */

  // I should not have the reference to any data structure in the controller. Instead i should save this
  // to factory and just have a variable that holds the object. 
  function Annotation(coords, title, tags, description){
    this.coordinates = coords;
    this.description = new Description(title, tags, description);
    this.id = '';
  };

  function Description(title, tags, description) {
    this.title = title;
    this.tags = tags;
    this.text = description;
    this.active = '';
  }

  var annotationData;


  function edit3D($scope, $mdDialog,  dialogMessages, decisionFactory, appStates, communicationChannel){
    $scope.close = function() {
      dialogMessages.modalReverse();
    }

    var state = {
      'objectDescriptionActive' : true,
      'annotationIndex': 0
    };

    var currentObject = appStates.getCurrentObject() || {};
    var currentTreeItem = appStates.getCurrentTreeItem() || {};
    $scope.object = decisionFactory.getObject(currentObject.id) || {};
    
    $scope.description = decisionFactory.getObjectDescription(currentObject.id);
    $scope.objectDescription = decisionFactory.getObjectDescription(currentObject.id);
    $scope.annotations = decisionFactory.getAnnotationList(currentObject.id);
    $scope.objectDescription.active = 'act';
    
    $scope.setAnnotation = function(annotation) {
      annotationData = annotation;
    }


    function clearActiveTabs() {
      $scope.annotations.forEach(function(item) {
        item.description.active = '';
      });
      $scope.objectDescription.active = '';
      state.objectDescriptionActive = false;
    }


    $scope.showAnnotations = function() {
      console.log('ok now we need to show annotations');
    }


    $scope.addAnnotation = function() {
      state.objectDescriptionActive = false;
      clearActiveTabs();
      $scope.annotations.push(new Annotation());
      state.annotationIndex = $scope.annotations.length - 1;
      $scope.annotations[state.annotationIndex].description.active = 'act';
      $scope.description = $scope.annotations[state.annotationIndex].description;
    }

    $scope.showObjectDescription = function() {
      clearActiveTabs();
      $scope.objectDescription.active = ($scope.objectDescription.active === '') ? 'act' : '';
      $scope.description = $scope.objectDescription;
    }


    $scope.showObjectAnnotation = function(index) {
      state.annotationIndex = index;
      clearActiveTabs();
      $scope.annotations[index].description.active = 'act';
      $scope.description = $scope.annotations[index].description;
      communicationChannel.setAnnotationRegion($scope.annotations[index].coordinates);
    }

    $scope.save = function() {
      var description = new Description($scope.description.title, $scope.description.tags, $scope.description.text);
      description.active = 'act';

      if(state.objectDescriptionActive) {
        $scope.objectDescription = description;
        decisionFactory.updateObjectDescription(currentObject, description);
      }else{
        $scope.annotations[state.annotationIndex].coordinates = annotationData;
        $scope.annotations[state.annotationIndex].description = description;
        $scope.annotations[state.annotationIndex].id = decisionFactory.addAnnotation(currentObject, $scope.annotations[state.annotationIndex]);
      
      }
    }




   



  }
  

})();