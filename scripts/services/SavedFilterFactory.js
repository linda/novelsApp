var app = angular.module('novelsApp');

app.factory('SavedFilterFactory', function(){
	var titleFilter = '';
	var characterFilter = '';
	var savedFilter = false;
	return {
		setTitleFilter : function(filter){
			titleFilter = filter;
		},
		setCharacterFilter : function(filter){
			characterFilter = filter;
		},
		getTitleFilter : function(){
			return titleFilter;
		},
		getCharacterFilter : function(){
			return characterFilter;
		},
		resetFilters : function(){
			titleFilter = '';
			characterFilter = '';
			savedFilter = false;
		},
		hasEntries : function(){
			return (titleFilter != '' && characterFilter != '');
		}

		// ... setter and getter for CharacterFilter, reset- for both filters
	}
});
