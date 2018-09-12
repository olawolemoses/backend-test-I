var assert = require('assert');
let User = require('./models/User');
user = new User("123", "Wole Moses", "wole_moses", "wole moses", 300, "#trump #russia");
describe('TwitterB0t Unit Tests', function () {
	it('should return true if user is well formed', function(){
	    var isValid = user.id == '123'
	        assert.equal(isValid, true);
	 });	
});
