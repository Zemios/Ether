import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Lesson } from 'src/courses/modules/lessons/entities/lesson.entity';
import { Answer } from 'src/courses/modules/lessons/questions/answers/entities/answer.entity';

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('int')
    lesson_id: number;

    @ManyToOne(() => Lesson, (lesson) => lesson.questions)
    @JoinColumn({ name: 'lesson_id' })
    lesson: Lesson;

    @Column('text')
    content: string;

    @OneToMany(() => Answer, (answer) => answer.question)
    answers: Answer[];
}
