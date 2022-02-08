import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import Tag from './Tag';

@Entity('contacts')
class Contact {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  email: string;

  @ManyToMany(() => Tag)
  @JoinTable({
    name: 'contacts_tags',
    joinColumns: [{ name: 'contact_id' }],
    inverseJoinColumns: [{ name: 'tag_id' }],
  })
  tags: Tag[];

  @Column()
  subscribed: boolean;

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

export default Contact;
