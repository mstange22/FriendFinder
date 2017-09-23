var friendsArray = require("../data/friends");

module.exports = function(app) {

	// post request
	app.get("/api/friends", function(req, res) {

		res.json(friendsArray);
	});

	app.post("/api/friends", function(req, res) {

		var match = findMatch(req.body);

		friendsArray.push(req.body);

		res.json(match);
	});
}

function findMatch(user) {

	var variance;
	var bestVariance = 40;

	for(i = 0; i < friendsArray.length; i++) {

		// if the user has a gender selected
		if(user.gender) {

			// compare against current friend's gender
			if(user.gender === friendsArray[i].gender) {

				// continue if same gender
				continue;
			}
		}

		variance = compareUserWithFriend(user.scores, friendsArray[i].scores);

		if (variance < bestVariance) {
		
			bestVariance = variance;
			match = friendsArray[i];
		}
	}

	return match;
}

function compareUserWithFriend(userScores, friendScores) {

	var variance = 0;

	for(var i = 0; i < userScores.length; i++) {

		variance += Math.abs(parseInt(userScores[i]) - parseInt(friendScores[i]));
	}

	return variance;
}