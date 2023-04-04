import { KafkaMessage } from 'kafkajs';

interface IKafkaHandler<T = any> {
  handle: (message: T) => Promise<void>;
}

const adaptKafkaHandler = (handler: IKafkaHandler) => {
  return async (message: KafkaMessage) => {
    await handler.handle(JSON.parse(message.value.toString()));
  };
};

export default adaptKafkaHandler;
