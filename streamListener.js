const User = require('./models/User');
const twit = require('twit');
require('dotenv').config();
const config = {
	consumer_key: process.env.consumer_key,
	consumer_secret: process.env.consumer_secret,
	access_token: process.env.access_token,
	access_token_secret: process.env.access_token_secret
};

const streamListener = ( hashtags ) => {
	const bot = new twit(config);
	bot.stream('statuses/filter', {
	  language: 'en',
	  track: hashtags
	})

	.on('connect', function (request) {
	  console.log('Connecting...');
	})

	.on('connected', function (response) {
		console.log('Connected!');
	})

	.on('tweet', function (tweet) {
		let getHashTags = function(array, strBio, strTweet){
			let hashUsedInBio = hashtags.filter( s => { return strBio && strBio.toLowerCase().includes(s.toLowerCase().substring(1));});
			let hashUsedInTweet = hashtags.filter( s => { return strTweet && strTweet.toLowerCase().includes(s.toLowerCase().substring(1));});
			let hashTagUsed = new Set([...hashUsedInBio, ...hashUsedInTweet]);
			return [...hashTagUsed];
		}

		// ignoring retweets
		if (tweet.retweeted) {
		      return;
		    }

		// aggregating user's data
		var user = {
			  id: tweet['user']['id_str'],
			  name: tweet['user']['name'],
			  screen_name: tweet['user']['screen_name'],
			  description: tweet['user']['description'],
			  no_followers: tweet['user']['followers_count'],
			  hashtags_used: getHashTags(hashtags, tweet['user']['description'], tweet['text'])
		};


	    // filtering users based on hashtags used and no of followers
	    if (  user.hashtags_used.length > 0 && (user.no_followers >= 1000 && user.no_followers <= 50000)) {
	    	newUser = new User(user.id, user.name, user.screen_name, user.description, user.no_followers, user.hashtags_used);

	    	// saving to Google Spreadsheet
	     	newUser.saveUser();

	     	// printing user data to screen
	    	newUser.printUser();
	      return;
	    }
	  })

	.on('limit', function (message) {
		  console.log('Limit notification received');
		  console.log(message);
	});

};
module.exports = { streamListener };
