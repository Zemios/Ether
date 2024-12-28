import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/users/models/user.entity';
import { Comment } from 'src/posts/comments/models/comment.entity';
import { UserLike } from 'src/users/users-likes/models/user-like.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  user_id: number;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({ type: 'varchar', length: 560 })
  content: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creation_date: Date;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @OneToMany(() => UserLike, (like) => like.post)
  likes: UserLike[];
}
