var app = angular.module('novelsApp');

app.controller('NewNovelController', function($scope, $stateParams, NovelsService, urlPrefix) {
	var NNC = this;
	NNC.showDetails = false;
	NNC.urlPlaceholder = urlPrefix.url;

	var author = $stateParams.predefinedAuthor != undefined ? $stateParams.predefinedAuthor : '';

	NNC.resetNovelForm = function (){
		console.log("Reset");
		NNC.novelToAdd = {
			title : '',
			author : author,
			published: '',
			completed: 'Y',
			settingStart: '',
			settingEnd: '',
			link: '',
			language: ''
		}
	};

	NNC.saveNewBook = function (){
		console.log("Saving!");
		console.log(NNC.novelToAdd);
		NovelsService.saveNovel(NNC.novelToAdd);
	};


	NNC.resetNovelForm();
});
