(function(){
  'use strict';
  angular
    .module('app.buildDecisions')
    .directive('imageCropper', imageCropperDirective);
  
  /* @ngInject */
  function imageCropperDirective ($timeout, communicationChannel, decisionFactory) {
    var directive = {
      restrict: 'E',
      link: link,
      scope: {
        image: '=',
        setarea: '&',
        object: '='
      },
      template: '<div class="cropper-container"><img id="im" ng-src="{{image}}" ></img></div>'
    };

      
    function CropData(x, y, w, h) {
      this.left = x;
      this.top = y;
      this.width = w;
      this.height = h;
    }


    var cropData;
    
    function link(scope, element, attrs) {
      if(scope.object === 'image') {
        var image = element[0].querySelector('#im');
        
        

        image.src = scope.image;
        var cropper;
        $timeout(function() {
          cropper = new Cropper(image, {
            crop: function(data) {
              cropData = data;
            },
            cropend: function(data) {
              scope.setarea({annotation: cropData});
            },
            guides: false,
            zoomable: false,
            built: function () {
              scope.setarea({annotation: cropper.getData()});
            }
          });
          
        }, 200);
        

        communicationChannel.onAnnotationRegionSet(scope, function(coords){
          cropper.setData(coords.data);
        });
        
      }


      
    }

    return directive;


  };  
  
 
})();