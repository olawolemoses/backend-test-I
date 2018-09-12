// test for the user upload to google spreadsheet
var assert = require('assert');
const sinon  = require('sinon');
let chai = require('chai');
var assert = chai.assert,
    expect = chai.expect;

let { updateSpreadsheet } = require('./updateSpreadsheet');

describe('Unit Tests', function() {
    describe('Update Google SpreadSheet', function() {

				it("Spreadsheet Update Profile validates profile info", function() {
						expect(() => updateSpreadsheet({'profile_name':'', 'no_followers':'123'})).to.throw(); // PASS
        });

        it("Spreadsheet Update Profile validates correct number of followers format", function() {
						expect(() => updateSpreadsheet({'profile_name':'hello', 'no_followers':'xyz'})).to.throw(); // PASS
        });


        it("Spreadsheet Update Profile validates number of followers must be >= 1000 and <= 50000", function() {
						expect(() => updateSpreadsheet({'profile_name':'hello', 'no_followers':'300'})).to.throw(); // PASS
        });

				it("Spreadsheet Updated with no errors", function(done){
						let spy = sinon.spy(console, 'error');
					  // call the function that needs to be tested
					  updateSpreadsheet({'profile_name':'wolz', 'no_followers':'5000'});
					  // assert that it was called with the correct value
					  assert(!spy.called);
					  // restore the original function
					  spy.restore();
						done();
				});
		});
});
