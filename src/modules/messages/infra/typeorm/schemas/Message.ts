import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('messages')
class Message {
  @ObjectIdColumn()
  id!: string;

  @ObjectIdColumn({ name: 'id' })
  _id!: string;

  @Column()
  subject: string;

  @Column()
  body: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export default Message;
