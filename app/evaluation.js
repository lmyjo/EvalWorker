"use strict"
const calculator = require('./models/calculator');
const evaluator = require('./models/evaluator');

module.exports = function evaluateRequest (evaluation, callback) {
  calculator.getVPN(evaluation)
    .then(calculator.getTIR)
    .then(calculator.getBC)
    .then((resultsObject) => {
      if (evaluation.evaluation_id) {
        evaluator.updateEvaluation(evaluation.evaluation_id, resultsObject, (err) => {
          if (err) return callback(err);
          callback(null, resultsObject);
        });
      } else {
        callback('***** ID NOT SPECIFIED *******');
      }
    })
    .catch((err) => {
      if (evaluation.evaluation_id) {
        evaluator.updateWithError(evaluation.evaluation_id, (error) => {
          if (error) return callback(error);
          callback(err);
        });
      } else {
        callback('***** ID NOT SPECIFIED *******');
      }
    });
};
