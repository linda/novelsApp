var app = angular.module('novelsApp');
app.constant("languages", {
    FR: 'French',
    EN : 'English',
    DE : 'German',
    O : 'Other'
});

app.filter('novelsFullLanguageName', function(languages) {
    return function(input){
        return(languages[input]);
    };
});
