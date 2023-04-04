/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import kafkaHandleAdapter from './adapters/KafkaHandleAdapter';
import { kafka } from './client';
import makeUpdateUserInfoHandler from './factories/UpdateContactInfoFactory';

export const consumer = kafka.consumer({
  groupId: 'umbriel-consumer',
  allowAutoTopicCreation: true,
});

const topics = ['umbriel.change-contact-info'] as const;

type Topic = typeof topics[number];

const updateUserInfoHandler = kafkaHandleAdapter(makeUpdateUserInfoHandler());

export async function start() {
  await consumer.connect();

  await Promise.all(
    topics.map((topic) => {
      return consumer.subscribe({ topic });
    })
  );

  await consumer.run({
    async eachMessage({ topic, message }) {
      try {
        switch (topic as Topic) {
          case 'umbriel.change-contact-info':
            await updateUserInfoHandler(message);
            break;
          default:
            console.error(`Kafka topic not handled: ${topic}`);
            break;
        }
      } catch (err) {
        console.log(`Error for message: ${message.value.toString()}`);
        console.error(err);
      }
    },
  });
}
