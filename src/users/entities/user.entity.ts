import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from 'src/posts/comments/entities/comment.entity';
import { UserLike } from 'src/users/users-likes/entities/user-like.entity';
import { News } from 'src/news/entities/news.entity';
import { Post } from 'src/posts/entities/post.entity';
import { UserProgress } from 'src/users/users-progress/entities/user-progress.entity';
import { UserProject } from 'src/users/users-projects/entities/user-project.entity';
import { Role } from 'src/common/enums/role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20 })
  name: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  title: string;

  @Column({ type: 'varchar', length: 255, nullable: true, default: 'default.svg' })
  profile_picture: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, select: false })
  password: string;

  @Column({ type: 'varchar', length: 280, nullable: true })
  about_me: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  registration_date: Date;

  @OneToMany(() => Comment, (comment) => comment.user, { cascade: true })
  comments: Comment[];

  @OneToMany(() => Post, (post) => post.user, { cascade: true })
  posts: Post[];

  @OneToMany(() => UserLike, (like) => like.user, { cascade: true })
  likes: UserLike[];

  @OneToMany(() => News, (news) => news.author, { cascade: true })
  news: News[];

  @OneToMany(() => UserProgress, (progress) => progress.user, { cascade: true })
  progress: UserProgress[];

  @OneToMany(() => UserProject, (project) => project.user, { cascade: true })
  projects: UserProject[];
}
