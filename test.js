// test for the user upload to google spreadsheet
var assert = require('assert');
const sinon  = require('sinon');
var expect = require('chai').expect;

let { updateSpreadsheet } = require('./updateSpreadsheet');
it("Spreadsheet Update has no errors", function(done){
		let spy = sinon.spy(console, 'error');
	  // call the function that needs to be tested
	  updateSpreadsheet({'profile_name':'wolz', 'no_followers':'5000'});
	  // assert that it was called with the correct value
	  assert(!spy.called);
	  // restore the original function
	  spy.restore();
	done();
});
