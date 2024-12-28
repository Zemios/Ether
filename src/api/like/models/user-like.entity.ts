import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { News } from 'src/api/news/models/news.entity';
import { Post } from 'src/api/post/models/post.entity';
import { User } from 'src/api/user/models/user.entity';

@Entity()
export class UserLike {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  user_id: number;

  @ManyToOne(() => User, (user) => user.likes)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ nullable: true })
  post_id: number;

  @ManyToOne(() => Post, (post) => post.likes)
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @Column({ nullable: true })
  news_id: number;

  @ManyToOne(() => News, (news) => news.likes)
  @JoinColumn({ name: 'news_id' })
  news: News;
}
