(function(){
  'use strict';
  angular.module('app.digitalObjects')
    .controller('editObject', editObject);

  

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

  /* @ngInject */
  function editObject($scope, $mdDialog, dialogService, decisionFactory, appStates, communicationChannel, _, currentObject){
    $scope.close = function() {
      dialogService.modalReverse();
    }

    $scope.activeTabIndicator = ['act'];
    $scope.objectType = currentObject.type;
    var currentTreeItem = appStates.getCurrentTreeItem();
    $scope.object = decisionFactory.getObject(currentObject.id);
    $scope.annotations = decisionFactory.getAnnotationList(currentObject.id);
    $scope.currentDescription = decisionFactory.getObjectDescription(currentObject.id);
    $scope.description = decisionFactory.getObjectDescription(currentObject.id);
    
    $scope.setAnnotation = function(annotation) {
      annotationData = annotation;
    }
    
    function clearActiveTabs() {
      _.fill($scope.activeTabIndicator, '');
    }

    function findActiveTab() {
      return _.findIndex($scope.activeTabIndicator, function(item) {
        return item === 'act';
      });
    }
    $scope.save = function() {
      var description = new Description($scope.currentDescription.title, $scope.currentDescription.tags, $scope.currentDescription.text);
      var tabIndex = findActiveTab();
      var annotationIndex;
      if(tabIndex === 0) {
        $scope.description = description;
        decisionFactory.updateObjectDescription(currentObject, description);
      }else{
        annotationIndex = tabIndex - 1;
        $scope.annotations[annotationIndex].coordinates = annotationData;
        $scope.annotations[annotationIndex].description = description;
        $scope.annotations[annotationIndex].id = decisionFactory.addAnnotation(currentObject, $scope.annotations[annotationIndex]);
      }
    }
   
    $scope.addAnnotation = function() {
      clearActiveTabs();
      $scope.annotations.push(new Annotation());
      $scope.activeTabIndicator.push('act');
      var annotationIndex = findActiveTab() - 1;
      $scope.currentDescription = $scope.annotations[annotationIndex].description;
      
    }
    
    $scope.showDescription = function() {
      clearActiveTabs();
      $scope.activeTabIndicator[0] = ($scope.activeTabIndicator[0] === '') ? 'act' : '';
      $scope.currentDescription = $scope.description;
    }

    $scope.showAnnotation = function(index) {
      clearActiveTabs();
      $scope.activeTabIndicator[index + 1] = 'act';
      $scope.currentDescription = $scope.annotations[index].description;
      communicationChannel.setAnnotationRegion($scope.annotations[index].coordinates);
    }

    $scope.removeAnnotation = function(index) {
      if($scope.annotations[index].id) {
        decisionFactory.deleteAnnotation(currentObject, $scope.annotations[index].id);
      }
      $scope.annotations.splice(index, 1);
      $scope.showDescription();
    }

  }
  

})();