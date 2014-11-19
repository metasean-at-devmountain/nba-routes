var app = angular.module('nbaRoutes');

app.service('teamService', function($http, $q){
	console.log('teamService');

	var parseRoot = 'https://api.parse.com/1/classes/';

	return {
		addNewGame: function(gameObject) {
			var url = parseRoot + gameObject.homeTeam,
			homeTeamScore = parseInt(gameObject.homeTeamScore),
			opponentScore = parseInt(gameObject.opponentScore);

			console.log(url, homeTeamScore, opponentScore);

			if (isNaN(homeTeamScore) || isNaN(opponentScore)) {
				console.log('it is a Nan!!');
			}

			gameObject.won = homeTeamScore > opponentScore;

			return $http.post(url, gameObject);  // this is a promise
		},

		getTeamData: function(teamName) {
		// 	var results = data.data.results,
		// 		i = results.length,
		// 		wins = 0,
		// 		losses = 0;

		// 	while (i--) {
		// 		if(results[i].won) {
		// 			wins += 1;
		// 		} else {
		// 			losses += 1;
		// 		}
		// 		i++
		// 	}

		// 	results.wins = wins;
		// 	results.losses = losses;

		// 	deferred.resolve(results);

		// };

			var deferred = $q.defer();
			$http.get(parseRoot + teamName).then(function (data) {
				var results = data.data.results,
					wins = 0,
					losses = 0,
					i = 0,
					length = results.length;

				for (i; i< results.length; i++) {
					if (results[i].won) {
						wins +=1;
					} else {
						losses +=1;
					}
				}

			});

			return deferred.promise;
		}
	};
});