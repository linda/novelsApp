var app = angular.module('novelsApp');
app.directive('novelsValidADYear', [ function() {
    return {
        restrict : 'A',
        require : 'ngModel',
        link : function(scope, element, attrs, ngModel) {
            var regex = /^([0-9]{1,3}|[0-2]{1}[0-9]{3})$/;
            ngModel.$validators.novelsValidADYear = function(modelValue, viewValue) {
                var year = modelValue || viewValue;
                if(!year) {
                    return true;
                } else {
                    return regex.test(year);
                }
            };
        }
    };
} ]);
