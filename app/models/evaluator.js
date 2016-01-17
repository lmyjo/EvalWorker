"use strict"
const lmyjoType = require('lmyjo-type');
const request = require('request');
const url = require('url');
const util = require('../utils/util');

function putChangesInUtility (route, updatedFields, callback) {
  let urlObject = util.getURI(route);
  let options = {
    method: 'PUT',
    uri: url.parse(urlObject),
    json: true,
    headers: [
      {
        name: 'content-type',
        value: 'application/x-www-form-urlencoded'
      }
    ],
    body: (updatedFields)
  };

  request(options, (error, response, body) => {
    if (error) return callback(error);

    if(response.statusCode >= 400) return callback(body);

    return callback(null);
  });
}

module.exports = {
  updateEvaluation : function updateEvaluationByID(idEvaluation, evaluationResults, callback) {
    let route = '/api/evaluaciones/' + idEvaluation;
    let updatedFields = {
      eval: {
        vpn : evaluationResults.vpn,
        bc: evaluationResults.bc
      },
      status: lmyjoType.getEstadoEvaluacion('evaluation_complete')
    };
    return putChangesInUtility(route, updatedFields, callback);
  },
  updateWithError : function updateEvaluationWithError (idEvaluation, callback) {
    let route = '/api/evaluaciones/' + idEvaluation;
    let updatedFields = {
      status: {
        code: -1,
        message: 'error'
      }
    };
    return putChangesInUtility(route, updatedFields, callback);
  }
}
