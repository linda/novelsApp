var app = angular.module('novelsApp');

app.controller('AddPersonController', function($scope, $filter, PersonsService) {
	var ACC = this;
    PersonsService.getAllPersonsNotAddedToNovel(ACC.novelId)
    .then(function(response){
        ACC.existingCharacters = response.data;
    },function(response){
    });

    ACC.toAdd = {
        novelId : ACC.novelId
    };

    ACC.addCharacter = function(){
        PersonsService.addExistingCharacterToNovel(ACC.toAdd)
            .then(function(response){
                if(response.data != 1){
                    console.log("Something went wrong")
                } else {
                    ACC.updateList();
                }
            });
    }
});
