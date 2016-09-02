var app = angular.module('novelsApp');

app.filter('novelsEmptyString', function() {
    return function(input){
        if(input == null || input == undefined || input ==''){
            return '-';
        } else {
            return input;
        }
    };
});
