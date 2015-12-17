(function(){
  'use strict';

  angular.module('app.buildDecisions')
    .factory('dialogMessages', DialogMessages);

  DialogMessages.$inject = ['$rootScope'];

  function DialogMessages($rootScope){
    var _REPLACE_MODAL_ = '_REPLACE_MODAL_';
    var _REVERSE_MODAL_ = '_REVERSE_MODAL_';

    

    function modalForward(item) {
      $rootScope.$broadcast(_REPLACE_MODAL_, item);
    }

    function onModalForward($scope, handler) {
      $scope.$on(_REPLACE_MODAL_, function(event, args) {
        handler(args);
      });
    }

    function modalReverse() {
      $rootScope.$broadcast(_REVERSE_MODAL_);
    }

    function onModalReverse($scope, handler) {
      $scope.$on(_REVERSE_MODAL_, function(event) {
        handler();
      });
    }

    

    return {
      modalForward: modalForward,
      onModalForward: onModalForward,
      modalReverse: modalReverse,
      onModalReverse: onModalReverse,
      
    }




    

    
  };

})();
