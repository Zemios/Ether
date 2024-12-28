import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from 'src/posts/comments/models/comment.entity';
import { UserLike } from 'src/users/users-likes/models/user-like.entity';
import { News } from 'src/news/models/news.entity';
import { Post } from 'src/posts/models/post.entity';
import { UserProgress } from 'src/users/users-progress/models/user-progress.entity';
import { UserProject } from 'src/users/users-projects/models/user-project.entity';

export enum UserRole {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  USER = 'user',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  /* TODO: add hashing for password */
  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 280, nullable: true })
  about_me: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  registration_date: Date;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => UserLike, (like) => like.user)
  likes: UserLike[];

  @OneToMany(() => News, (news) => news.author)
  news: News[];

  @OneToMany(() => UserProgress, (progress) => progress.user)
  progress: UserProgress[];

  @OneToMany(() => UserProject, (project) => project.user)
  projects: UserProject[];
}
