var app = angular.module('novelsApp');

app.service('NovelsService', function($http){
	return {
		getAllNovels: function () {
			return $http({
				'url': 'api/novels.php?action=getAllNovels',
				'method': 'GET'
			});
		},
		getAllPersons: function () {
			return $http({
				'url': 'api/novels.php?action=getAllPersons',
				'method': 'GET'
			});
		},
		getNovelCharacters : function(novelID){
			return $http.get('api/novels.php?action=getNovelCharacters&ID='+novelID);
		},

		getAllAuthors: function () {
			return $http({
				'url': 'api/novels.php?action=getAllAuthors',
				'method': 'GET'
			});
		},
		getNovelDetails: function (id) {
			return $http({
				'url': 'api/novels.php?action=getNovelDetails&ID='+id,
				'method': 'GET'
			});
		},
		saveNovel: function (novel) {
			return $http({
				'url': 'api/novels.php/saveNovel',
				'method': 'POST',
				'headers': {
					'Content-Type': 'application/json'
				},
				'data': novel
			});
		}
	};
});