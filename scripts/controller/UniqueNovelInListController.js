var app = angular.module('novelsApp');

app.controller('UniqueNovelInListController', function($scope) {
	var UNC = this;
    UNC.showForm = false;
    UNC.toggleShowForm = function(){
        UNC.showForm = !UNC.showForm;
    };
});
