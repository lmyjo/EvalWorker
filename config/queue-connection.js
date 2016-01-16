"use strict"

const amqp = require('amqplib');

var queueProtocol = process.env.QUEUE_PROTOCOL;
var queueHost = process.env.QUEUE_HOST;

var queueConnection = amqp.connect(queueProtocol + '://' + queueHost);

module.exports = queueConnection;
