"use strict";
class User {
	constructor(id, screen_name, description, no_followers){
		this.id = id;
		this.screen_name = screen_name;
		this.description = description;
		this.no_followers = no_followers;
	}
	
	saveUser(){
		console.log(`The user is ${this.screen_name}`);
	}
}

module.exports =  User;