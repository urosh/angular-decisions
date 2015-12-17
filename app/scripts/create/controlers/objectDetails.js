(function(){
  'use strict';
  angular.module('app.buildDecisions')
    .controller('objectDetails', objectDetails);

  /* @ngInject */

  var annotationData;


  function objectDetails($scope,   dialogMessages, decisionFactory, communicationChannel, id){
    $scope.close = function() {
      dialogMessages.modalReverse();
    }
    
    $scope.activeTabIndicator = ['act'];

    $scope.object = decisionFactory.getObject(id);
    $scope.objectType = $scope.object.type;
    $scope.setAnnotationArea = function(annotation) {
      annotationData = annotation;
    }

    $scope.annotations = decisionFactory.getAnnotationList(id);
    
    $scope.currentDescription = decisionFactory.getObjectDescription(id);
    
    $scope.description = decisionFactory.getObjectDescription(id);
    


    
    function clearActiveTabs() {
      _.fill($scope.activeTabIndicator, '');
    }

    function findActiveTab() {
      return _.findIndex($scope.activeTabIndicator, function(item) {
        return item === 'act';
      });
    }
    
    $scope.showDescription = function() {
      clearActiveTabs();
      $scope.activeTabIndicator[0] = ($scope.activeTabIndicator[0] === '') ? 'act' : '';
      $scope.currentDescription = $scope.description;
      communicationChannel.setAnnotationRegion();
    }

    $scope.showAnnotation = function(index) {
      clearActiveTabs();
      $scope.activeTabIndicator[index + 1] = 'act';
      $scope.currentDescription = $scope.annotations[index].description;
      communicationChannel.setAnnotationRegion($scope.annotations[index].coordinates);
    }




    /*$scope.activeTabIndicator = ['act'];


    

    $scope.object = decisionFactory.getObject(id);
    

    

    
    
    */

    



  }
  

})();