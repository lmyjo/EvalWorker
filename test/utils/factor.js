var assert = require('assert');
const factors = require('../../app-cov/utils/factors');

describe('factor', function() {
  describe('getFromFuture()', function () {
    it('should return 453.51473922902494', function (done) {
	  var calc = factors.getFromFuture(2,0.05,500);
	  console.log(calc);
	  assert.equal(453.51473922902494,calc);
	  done();  
    });
  });
  
  describe('getFromSerie()', function () {
    it('should return 218.59344264369076', function (done) {
	  var calc = factors.getFromSerie(2,0.05,500,0.5);
	  console.log(calc);
	  assert.equal(218.59344264369076,calc);
	  done();  
    });
  });
  
  describe('getFromGradient()', function () {
    it('should return 108.18489580208735', function (done) {
	  var calc = factors.getFromGradient(2,0.05,500,0.5,1);
	  console.log(calc);
	  assert.equal(108.18489580208735,calc);
	  done();  
    });
  });
  
});
