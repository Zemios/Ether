import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { UserLike } from 'src/users/users-likes/entities/user-like.entity';

@Entity()
export class News {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  publication_date: Date;

  @Column({ type: 'varchar', length: 20, nullable: true })
  category: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  image: string;

  @Column({ nullable: true })
  author_id: number;

  @ManyToOne(() => User, (user) => user.news, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'author_id' })
  author: User;

  @OneToMany(() => UserLike, (like) => like.news, { cascade: true })
  likes: UserLike[];
}
