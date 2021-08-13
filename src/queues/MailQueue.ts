import Queue from 'bull';

const MailQueue = new Queue('mail');

export default MailQueue;
