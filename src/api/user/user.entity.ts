import { Comment } from "src/api/comment/comment.entity";
import { Like } from "src/api/like/like.entity";
import { News } from "src/api/news/news.entity";
import { Post } from "src/api/post/post.entity";
import { ProjectCollaborator } from "src/api/project-collaborator/project-collaborator.entity";
import { UserProgress } from "src/api/user-progress/user-progress.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @Column('text', { nullable: true })
    role: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    registration_date: Date;

    @OneToMany(() => Comment, (comment) => comment.user)
    comments: Comment[];

    @OneToMany(() => Post, (post) => post.user)
    posts: Post[];

    @OneToMany(() => Like, (like) => like.user)
    likes: Like[];

    @OneToMany(() => News, (news) => news.author)
    news: News[];

    @OneToMany(() => UserProgress, (progress) => progress.user)
    progress: UserProgress[];

    @OneToMany(() => ProjectCollaborator, (collaborator) => collaborator.user)
    projects: ProjectCollaborator[];
}