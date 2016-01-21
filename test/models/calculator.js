var assert = require('assert');
const calculator = require('../../app-cov/models/calculator');

const operaciones = require('../mocks/operaciones');
const vpn_data = require('../mocks/vpn');

describe('calculator', function() {
  describe('getVPN()', function () {
    it('should return 1006.2931950793609', function (done) {
	  var prom = calculator.getVPN(operaciones);
	  console.log(prom);
	  prom.then(function(data){
		assert.equal(1006.2931950793609, data.vpn);
		done();
	  });      
    });
  });
  
  describe('getVPN()', function () {
    it('should return <rehected> when the evalObject does not has operations', function (done) {
	  var prom = calculator.getVPN({});
	  console.log(prom);
	  prom.then(function(data){
		assert.fail(data, 'error', 'Returned VPN without operations');		
	  });
	  assert.ok(true);
	  done();
    });
  });
  
  describe('getBC()', function () {
    it('should return 1.1007755157766457', function (done) {
	  var prom = calculator.getBC(vpn_data);
	  console.log(prom);
	  prom.then(function(data){
		assert.equal(1.1007755157766457, data.bc);
		done();   
	  });	    
    });
  });
});
