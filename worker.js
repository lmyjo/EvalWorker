"use strict"

require('./config/envloader');

const queueConnection = require('./config/queue-connection');
const messageHandler = require ('./app/controllers/message-handler');

queueConnection.then((connection) => {
  let connectionChannel = connection.createChannel();
  connectionChannel.then((channel) => {
    let queueName = process.env.QUEUE_NAME;

    channel.assertQueue(queueName, {durable: true});
    channel.prefetch(1);

    console.log('[***] Waiting for connections from %s', queueName);

    channel.consume(queueName, messageHandler(channel), {noAck: false});
  });
}, (err) => {
  console.error('Connection failed: %s', err);
  process.exit(1);
}).then(null, (err) => {
  console.error('Connection failed by thrown error: %s', err);
  process.exit(1);
});
