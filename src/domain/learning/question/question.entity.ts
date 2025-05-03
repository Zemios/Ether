import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Lesson } from '../lessons/lesson.entity';
import { Answer } from '../answers/answer.entity';

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('int')
    lesson_id: number;

    @ManyToOne(() => Lesson, (lesson) => lesson.questions, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'lesson_id' })
    lesson: Lesson;

    @Column('text')
    content: string;

    @OneToMany(() => Answer, (answer) => answer.question, { cascade: true })
    answers: Answer[];
}
