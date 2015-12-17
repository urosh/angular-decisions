(function(){
  'use strict';
  angular
    .module('app.buildDecisions')
    .directive('storyObjectsList', storyObjectsList);
  
  /*@NgInject*/

  angular
    .module('app.buildDecisions')
    .controller('storyObjectListController', storyObjectListController);
  
  function storyObjectListController($scope, storyMessages, appStates, dialogMessages, decisionFactory) {
    
    var vm = this;
    vm.addItem = addItem;
    vm.objects = decisionFactory.getObjectList(vm.item);
    vm.showDetails = showDetails;
    function showDetails(id) {
      // save the current story
      storyMessages.saveStory();
      dialogMessages.modalForward({
        'current': 'editNode',
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

  function storyObjectsList(storyService, storyMessages, $timeout, decisionFactory, dialogMessages) {
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
      templateUrl: 'scripts/create/templates/storyObjectsList.html',
      //template: '<p ng-click="showDetails()" >Select objects</p>'
    };
    
    

    
    return directive;
  }

})();