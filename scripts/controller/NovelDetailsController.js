var app = angular.module('novelsApp');

app.controller('NovelDetailsController', function($scope, $state, novel){
	var NDC = this;
	NDC.novel = novel.data;
	NDC.reload = function (){
		$state.reload();
	}
});
