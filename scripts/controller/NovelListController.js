var app = angular.module('novelsApp');

app.controller('NovelListController', function($scope, $state, $rootScope, NovelsService, allNovels,
	SavedFilterFactory
) {
	var NLC = this;
	NLC.novels = allNovels.data;

	NLC.reload = function (){
		console.log("load");
		$state.reload();
	};

	NLC.updateList = function (index, id){
		NovelsService.getNovelCharacters(id)
			.then(function(characters){
				var chars = characters.data;
				if(NLC.novels[index].ID == id){ // update the array was not changed in the meantime
					console.log("We're good");
					NLC.novels[index].chars = chars;
				}
			});
		};

	if(SavedFilterFactory.hasEntries()){
		NLC.titleFilter = SavedFilterFactory.getTitleFilter();
		SavedFilterFactory.resetFilters();
	}
	$scope.$on('$stateChangeStart',
		function(event, toState, toParams, fromState, fromParams){
			if(toState.name == 'novelDetails'){
				SavedFilterFactory.setTitleFilter(NLC.titleFilter);
				console.log(SavedFilterFactory.getTitleFilter());
				SavedFilterFactory.setCharacterFilter($state.current.name);
			} else {
				//SavedFilterFactory.clear();
			}
		})


});
