(function(){
  'use strict';
  angular
    .module('app.stories')
    .directive('storyObjectsList', storyObjectsList);
  
  /*@NgInject*/

  angular
    .module('app.stories')
    .controller('storyObjectListController', storyObjectListController);
  
  function storyObjectListController($scope, storyMessages, appStates, dialogService, decisionFactory) {
    
    var vm = this;
    vm.addItem = addItem;
    vm.objects = decisionFactory.getObjectList(vm.item);
    vm.showDetails = showDetails;
    function showDetails(id) {
      // save the current story
      storyMessages.saveStory();
      dialogService.modalForward({
        'current': 'editTreeItem',
        'currentData': {
          treeItem: appStates.getCurrentTreeItem()

        },
        'next': 'objectDetails',
        'nextData': {
          id: id  
        }
      });
    }

    function addItem(id) {
      storyMessages.addItem(id);
    }

    return vm;

  }

  function storyObjectsList(storyService, storyMessages, $timeout, decisionFactory) {
    var directive = {
      controller: 'storyObjectListController',
      controllerAs: 'vm',
      scope: {
        id: '=',
        type: '=',
        item: '='
      },
      bindToController: true,
      restrict: 'E',
      /*template: '<div class="objectsListDiv"><p>Select objects</p><div ng-repeat="object in vm.objects" class="objectContainer"><img ng-src="{{object.thumbnail}}" height="50px"></img></div></div>',*/
      templateUrl: 'scripts/stories/storyObjectsListTemplate.html',
      //template: '<p ng-click="showDetails()" >Select objects</p>'
    };
    
    

    
    return directive;
  }

})();