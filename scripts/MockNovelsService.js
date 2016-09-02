var app = angular.module('novelsApp');

app.constant("MockNovelList", [
		{ 'ID' : 1,'Author': 'Leo Tolstoi','Title' : 'War and Peace', 'chars' : ['Napoleon'] },
		{ 'ID' : 2,'Author': 'Alexandre Dumas','Title' : 'The Three Musketeers', 'chars' :
			['Anna of Austria','Richelieu', "Louis XIII"] }
]);



app.service('MockNovelService', function(MockNovelList){
	return {
		getAllNovels: function () {
			return MockNovelList.data;
		},
		getAllPersons: function () {
			return $http({
				'url': 'api/novels.php?action=getAllPersons',
				'method': 'GET'
			});
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
				'url': 'api/novels_save.php',
				'method': 'POST',
				'headers': {
					'Content-Type': 'application/json'
				},
				'data': novel
			});
		}
	};
});s