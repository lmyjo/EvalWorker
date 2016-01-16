"use strict"
const calculator = require('./models/calculator');

module.exports = function evaluateRequest (evaluation, callback) {
  calculator.getVPN(evaluation)
    .then(calculator.getTIR)
    .then(calculator.getBC)
    .then((resultsObject) => (callback(null, resultsObject)));
}
