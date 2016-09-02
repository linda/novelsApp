var app = angular.module('novelsApp', ['ngRoute']);

app.config(function ($stateProvider) {
        $stateProvider.state('home', {
            url: '/',
            templateUrl: 'index.html'
        }).state('novelsList', {
            url: '/novelsList',
            templateUrl: 'views/novelList.html',
        }).state('addNovel', {
            url: '/addNovel',
            templateUrl: 'views/addNovel.html'
        })
    });
