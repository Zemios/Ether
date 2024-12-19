import { Course } from "src/course/course.entity";
import { Lesson } from "src/lesson/lesson.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Module {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    course_id: number;

    @ManyToOne(() => Course, (course) => course.modules)
    @JoinColumn({ name: 'course_id' })
    course: Course;

    @Column('text')
    title: string;

    @Column('text', { nullable: true })
    description: string;

    @Column()
    module_order: number;

    @OneToMany(() => Lesson, (lesson) => lesson.module)
    lessons: Lesson[];
}