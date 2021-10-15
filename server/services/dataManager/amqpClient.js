'use strict';
const amqp = require('amqplib');
const EventEmitter = require('events');
const uuid = require('uuid');

const REPLY_QUEUE = 'amq.rabbitmq.reply-to';

/**
 * Create amqp channel and return back as a promise
 * @params {Object} setting
 * @params {String} setting.url
 * @returns {Promise} - return amqp channel
 */
const createClient = (setting) => amqp.connect(setting.url)
  .then(conn => conn.createChannel()) // create channel
  .then(channel => {
    channel.responseEmitter = new EventEmitter();
    channel.responseEmitter.setMaxListeners(0);
    channel.consume(REPLY_QUEUE,
      msg => channel.responseEmitter.emit(msg.properties.correlationId, msg.content),
      { noAck: true });
    return channel;
  });

/**
 * Send RPC message to waiting queue and return promise object when
 * event has been emitted from the "consume" function
 * @params {Object} channel - amqp channel
 * @params {String} message - message to send to consumer
 * @params {String} rpcQueue - name of the queue where message will be sent to
 * @returns {Promise} - return msg that send back from consumer
 */
const sendRPCMessage = (channel, message, rpcQueue) => new Promise(resolve => {
  const correlationId = uuid.v4();

  channel.responseEmitter.once(correlationId, resolve);
  channel.sendToQueue(rpcQueue, Buffer.from(JSON.stringify(message)), { correlationId, replyTo: REPLY_QUEUE });
});

module.exports.createClient = createClient;
module.exports.sendRPCMessage = sendRPCMessage;