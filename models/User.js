"use strict";

let { updateSpreadsheet } = require('../updateSpreadsheet');
class User {

	constructor(id, name, screen_name, description, no_followers, hashtags_used){
		this.id = id;
		this.screen_name = screen_name;
		this.description = description;
		this.no_followers = no_followers;
		this.name = name;
		this.hashtags_used = hashtags_used;
	}
	

	printUser(){
		console.info("[x] Profile name: " + this.screen_name);
		console.info("[x] Number of followers: " + this.no_followers);
		console.info("[x] User description: " + this.description);
		console.info("[x] Hash tags: " + this.hashtags_used.join(" ") );
		console.log("----------------------------------------------------------------------------------");
	}

	saveUser(){
		updateSpreadsheet({"profile_name": this.screen_name, "no_followers" :this.no_followers});
	}
}

module.exports =  User;
