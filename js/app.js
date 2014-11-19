var app = angular.module('nbaRoutes', ['ngRoute']);

app.config(function($routeProvider, $httpProvider){
  $httpProvider.interceptors.push('httpRequestInterceptor');
  console.log('config');

  $routeProvider
	  .when('/', {
		  	templateUrl: 'js/home/homeTmpl.html',
		  	controller: 'homeCtrl'
	  })
	  .when('/teams/:team', {
		  	templateUrl: 'js/teams/teamTmpl.html',
		  	controller: 'teamCtrl',
		  	resolve: {
		  		teamData: function(teamService, $route) {
		  			return teamService.getTeamData($route.current.params.team)
		  		}
		  	}
	  }).otherwise('/');

}).run ( function() {
  	console.log('run');

  //router here
});
