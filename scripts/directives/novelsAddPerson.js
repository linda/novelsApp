var app = angular.module('novelsApp');
app.directive('novelsAddPerson', ['novelsConfig',
function(novelsConfig) {
    return {
        restrict : 'EA',
        transclude : true,
        scope : {
            novelId : '=?',
            novelTitle : '=?',
            updateList : '&?'
        },
        bindToController: true,
        templateUrl : novelsConfig.urlPath+ 'views/templates/addHistoricalPerson.html',
        controller: 'AddPersonController',
        controllerAs: 'ACC'
}
}]);