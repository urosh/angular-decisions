(function(){
	"use strict";

	angular.module('app.buildDecisions', ['textAngular', 'ngFileUpload']);

	angular.module('app.buildDecisions')
    .config(function($provide){
      $provide.decorator('taOptions', ['$delegate', function(taOptions) { // $delegate is the taOptions we are decorating
        taOptions.toolbar = [
            ['h1', 'h2', 'h3',  'p'],
            ['bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol', 'redo', 'undo', 'clear'],
            ['justifyLeft', 'justifyCenter', 'justifyRight', 'indent', 'outdent'],
            ['insertLink', 'insertVideo']
        ];
        return taOptions;
    }]);
    })
    .config(function($provide){
      $provide.decorator('taOptions', ['taRegisterTool', '$delegate', function(taRegisterTool, taOptions) {
        taRegisterTool('uploadImage', {
          iconclass: "fa fa-image",
          action: function (deferred) {
            console.log('ok we should do something now')
          }
        });
        taOptions.toolbar[2].push('uploadImage');
        return taOptions;
      }]);    
    })
    
    .controller("demoController", function demoController($scope) {
      $scope.htmlContent = '';
    });

  

	
})();