import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Question } from 'src/api/question/models/question.entity';

@Entity()
export class Answer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('int')
    question_id: number;

    @ManyToOne(() => Question, (question) => question.answers)
    @JoinColumn({ name: 'question_id' })
    question: Question;

    @Column('text', { nullable: true })
    content: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    image: string;

    @Column({ type: 'boolean' })
    is_correct: boolean;
}
