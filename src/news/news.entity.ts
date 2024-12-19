import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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
    @JoinColumn({ name: 'author_id' })
    author: User;
}