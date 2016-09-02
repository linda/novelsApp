var app = angular.module('novelsApp', ['ui.router', 'ngMessages']);

//app.controller('MainController', function($scope) {
//	console.log("Hey main controller!");
//});

app.controller('WelcomeScreenController', function(SavedFilterFactory){
	var WSC = this;
	console.log("Hello welcome screen controller!");
});

app.constant("novelsConfig", {
	'urlPath': 'http://localhost/dumas/'
});
app.constant("urlPrefix", {
	'url': 'http://'
});


app.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/home");
	$stateProvider
	.state('home', {
		url: '/home',
		templateUrl : 'views/homeScreen.html',
		controller: 'WelcomeScreenController',
		controllerAs : 'WSC'
	}).state('home.criteria', {
		url: '/criteria',
		views : {
			'criteria' : {
				templateUrl: 'views/templates/additionCriteria.html'
			}
		}
	}).state('novelList', {
		url: '/novelList',
		templateUrl: 'views/novelList.html',
		controller: 'NovelListController as NLC',
		resolve :{
			allNovels: function(NovelsService){
				return NovelsService.getAllNovels();
			}
		}
	}).state('addNovel', {
		url: '/addNovel',
		templateUrl: 'views/addNovel.html',
		controllerAs: 'NNC',
		controller: 'NewNovelController',
		params : {predefinedAuthor : 'Alexandre Dumas'}
	}).state('novelDetails', {	
		url: '/details/:id',
		templateUrl: 'views/novelDetails.html',
		controllerAs: 'NDC',
		controller: 'NovelDetailsController',
		resolve: {
			novel: function ($stateParams, NovelsService) {
				return NovelsService.getNovelDetails($stateParams.id);
			}
		} 
	});
});