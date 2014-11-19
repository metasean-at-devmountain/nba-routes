var app = angular.module('nbaRoutes');

app.controller('teamCtrl', function($scope, $routeParams, teamService, teamData){
	$scope.teamData = teamData;

	$scope.newGame = {};

	var nameMap = {
		'utahjazz': 'Utah Jazz',
		'losangeleslakers': 'LA Lakers',
		'miamiheat': 'Miami Heat'
	},
	imageMap = {
		'utahjazz': 'images/jazz-logo.png',
		'losangeleslakers': 'images/lakers-logo.png',
		'miamiheat': 'images/heat-logo.png'
	},
	newGame = {
		homeTeam: $routeParams.team
	};
	$scope.homeTeam = nameMap[$routeParams.team];
	$scope.logoPath = imageMap[$routeParams.team];

	// var teamName = $routeParams.team;
	// if(teamName === 'utahjazz') {
	// 	$scope.teamName = 'Utah Jazz';
	// } else if (teamName === 'losangeleslakers') {
	// 	$scope.teamName = "LA Lakers";
	// } else if (team === 'miamiheat') {
	// 	$scope.teamName = "Miami Heat";
	// }

	$scope.newGame =	newGame;
		// { homeTeam: $scope.homeTeam.split(' '), join('').toLowerCase(); }  // coupling == bad, evil, suckiness
		


	$scope.submitGame = function () {
		teamService.addNewGame($scope.newGame)
			.then(function() {
				teamService.getTeamData($routeParams.team).then(function(data) {
					$scope.teamData = data;
					$scope.newGame = newGame;
					$scope.showNewGameForm = false
				});
		});
	};
});