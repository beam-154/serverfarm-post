const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['kafka:9092'],
});

const producer = kafka.producer();

async function connectProducer() {
  await producer.connect();
  console.log('Producer connected to Kafka brokers');
}

async function sendMessage(topic, message) {
  await producer.send({
    topic: topic,
    messages: [{ value: message }],
  });
  console.log(`Message sent to topic ${topic}: ${message}`);
}

module.exports = { connectProducer, sendMessage };
