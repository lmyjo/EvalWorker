"use strict"
const evaluation = require('../evaluation');

module.exports = function (channel) {

  let messageHandler = function messageHandlerFunction (queueMessage) {
    if(queueMessage !== null && queueMessage !== undefined) {
      let evaluationMessage = queueMessage.content.toString();
      let evaluationObject = JSON.parse(evaluationMessage);
      evaluation(evaluationObject, (err, value)=>{
        if(err) console.log(err);
        //set a state of error in the evaluation
        console.log(value);
        channel.ack(queueMessage);
      });
    }
  };

  return messageHandler;
};
