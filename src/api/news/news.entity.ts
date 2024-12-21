import { User } from "src/api/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Like } from "../like/like.entity";

@Entity()
export class News {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    title: string;

    @Column('text')
    content: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    publication_date: Date;

    @Column('text', { nullable: true })
    category: string;

    @Column('text', { nullable: true })
    image: string;

    @Column({ nullable: true })
    author_id: number;

    @ManyToOne(() => User, (user) => user.news)
    author: User;

    // Add relationship to likes
    @OneToMany(() => Like, (like) => like.news)
    likes: Like[];
}