(function(){
  'use strict';
  angular
    .module('app.digitalObjects')
    .directive('threeDeeRenderer', threeDeeRenderer);
  /* @ngInject */
  function threeDeeRenderer ($timeout, communicationChannel, decisionFactory) {
    var directive = {
      restrict: 'E',
      scope: {
        docid: '=',
        setannotation: '&',
        object: '=',
        mode: '='
      },
      template: '<div class="threeDeeDiv"><md-progress-circular class="md-warn" md-mode="{{loaderActive}}" md-diameter="70"></md-progress-circular></div>',
      link: link,
    };
    return directive;

    
    

    var camera, 
        scene, 
        renderer, 
        ambient, 
        texture, 
        loader, 
        directionalLight, 
        controls,
        obj, 
        raycaster, 
        mouseVector, 
        projector,
        mouse,
        container;

      
    function link(scope, element, attrs) {
      if(scope.object === '3d'){
        communicationChannel.onAnnotationRegionSet(scope, function(coords){
          var sphereGeometry = new THREE.SphereGeometry( 3, 32, 32 );
          var sphereMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, shading: THREE.FlatShading } );
          var sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
          if (typeof coords.data !== 'undefined'){
            sphere.position.copy(coords.data);
            //currentSphere = sphere;
            
            scene.remove( currentSphere );
            currentSphere = sphere;
            scene.add( currentSphere );
            render();
          }else{
            scene.remove( currentSphere );
            render();
          }
          
        });
        scope.loaderActive = "indeterminate";
        raycaster = new THREE.Raycaster();
        mouse = new THREE.Vector2();
        container = element[0].children[0];
        
        $timeout(function() {
          camera = new THREE.PerspectiveCamera( 45, container.clientWidth / container.clientHeight, 1, 2000 );  
          camera.position.z = 400;
          scene = new THREE.Scene();
          ambient = new THREE.AmbientLight( 0xffffff );
          scene.add( ambient );

          directionalLight = new THREE.DirectionalLight( 0xffeedd );
          directionalLight.position.set( 1, -1, 1 );
          scene.add( directionalLight );
          
          texture = new THREE.Texture();

          loader = new THREE.ImageLoader(  );
          loader.crossOrigin = 'anonymous';
          var objLoader = new THREE.OBJLoader();
          objLoader.crossOrigin = 'anonymous';

          loader.load( 'http://public.cyi.ac.cy/starcRepo/db/upload/' + scope.docid +'_texture.jpg', function ( image ){
            texture.image = image;
            texture.needsUpdate = true;
          });

          objLoader.load( 'http://public.cyi.ac.cy/starcRepo/db/upload/' + scope.docid + '.obj', function ( object ) {
            //object.id = 'uros';
            scope.loaderActive = "";
            scope.$apply();
            object.traverse( function ( child ) {

              if ( child instanceof THREE.Mesh ) {

                child.material.map = texture;
                child.geometry.computeBoundingBox();
                object.bBox = child.geometry.boundingBox;
                object.position.y = - 80;
              }

            } );

            camera.lookAt( scene.position );
            obj = object;
            scene.add( object );

            


          }, function(){
            //console.log('we are loading');
          }, function(){
            //console.log('we loaded');
          });  
          
          renderer = new THREE.WebGLRenderer({alpha: true, antialias:true} );
          renderer.setPixelRatio( window.devicePixelRatio );
          renderer.setSize( container.clientWidth, container.clientHeight );
          container.appendChild( renderer.domElement );
          controls = new THREE.OrbitControls( camera, renderer.domElement );

          raycaster = new THREE.Raycaster();
          raycaster.params.Points.threshold = 0.1;
          mouseVector = new THREE.Vector2();
          projector = new THREE.Projector();

          if(scope.mode === 'edit'){
            container.addEventListener( 'click', onMouseClick, false );
          }
          //
          animate();

          
        }, 200);
  
        

      }

      function animate() {
        requestAnimationFrame( animate );
        controls.update();
        render();
      }
        
      function render() {
       renderer.render( scene, camera );
      }
        
      var currentSphere;
        
      function onMouseClick(event) {
        event.preventDefault();

        var parentPosition = getPosition(container);
        var xPosition = event.clientX - parentPosition.x;
        var yPosition = event.clientY - parentPosition.y;
        
        mouse.x = ( xPosition / container.clientWidth ) * 2 - 1;
        mouse.y = - ( yPosition / container.clientHeight ) * 2 + 1;

        raycaster.setFromCamera( mouse, camera ); 

        // calculate objects intersecting the picking ray
        var intersects = raycaster.intersectObjects( scene.children, true );
        var intersection = ( intersects.length ) > 0 ? intersects[ 0 ] : null;
        if(intersection !== null){
          var sphereGeometry = new THREE.SphereGeometry( 3, 32, 32 );
          var sphereMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, shading: THREE.FlatShading } );
          var sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
          sphere.position.copy(intersection.point);
          //currentSphere = sphere;
          
          scene.remove( currentSphere );
          currentSphere = sphere;
          scene.add( currentSphere );
          render();
          scope.setannotation({annotation: intersection.point});

        } 
      }




    }


    
     
    function getPosition(element) {
        var xPosition = 0;
        var yPosition = 0;
          
        while (element) {
            xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
            yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
            element = element.offsetParent;
        }
        return { x: xPosition, y: yPosition };
    }



    


  };  
  
 
})();