(function(){
  'use strict';
  angular.module('app.treeModule')
    .controller('newDocument', newDocument);

  /* @ngInject */
  function newDocument($scope, $mdDialog, docType) {
    $scope.close = function() {
      $mdDialog.cancel();
    };
    $scope.documentType = docType;
    $scope.addNewDocument = function() {
      if($scope.documentForm.$valid) {
        $mdDialog.hide($scope.document);
      }
    }
  }

  

})();