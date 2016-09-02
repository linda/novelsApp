var app = angular.module('novelsApp');

app.service('PersonsService', function($http){
	return {
		getAllPersons: function () {
			return $http.get('api/novels.php?action=getAllPersons');
		},
		getAllPersonsNotAddedToNovel: function (novelID) {
			return $http.get('api/novels.php?action=getAllPersonsNotAddedToNovel&ID='+novelID);
		},
		addExistingCharacterToNovel: function (data){
			return $http({
				'url': 'api/novels.php/addExistingCharacter',
				'method': 'POST',
				'headers': {
					'Content-Type': 'application/json'
				},
				'data': data
			});
		},
		addNewCharacterToNovel: function (novelID, characterName){
			var data = {
				'novelID' : novelID,
				'characterName' : characterID
			};
			return $http({
				'url': 'api/characters_save.php',
				'method': 'POST',
				'headers': {
					'Content-Type': 'application/json'
				},
				'data': data
			});
		}

	};
});