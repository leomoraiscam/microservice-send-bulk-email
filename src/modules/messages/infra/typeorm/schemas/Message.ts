import {
  ObjectID,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
} from 'typeorm';

@Entity('messages')
class Message {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  subject: string;

  @Column()
  body: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Message;
