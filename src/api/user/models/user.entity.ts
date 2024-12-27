import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "src/api/comment/models/comment.entity";
import { UserLike } from "src/api/like/models/user-like.entity";
import { News } from "src/api/news/models/news.entity";
import { Post } from "src/api/post/models/post.entity";
import { UserProgress } from "src/api/user-progress/models/user-progress.entity";
import { UserProject } from "src/api/user-project/models/user-project.entity";

export enum UserRole {
    ADMIN = 'admin',
    MODERATOR = 'moderator',
    USER = 'user',
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    name: string;

    @Column('text', { unique: true })
    email: string;

    @Column('text')
    password: string;

    @Column('text', { nullable: true })
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