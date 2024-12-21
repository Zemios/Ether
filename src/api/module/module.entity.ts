import { Course } from "src/api/course/course.entity";
import { Lesson } from "src/api/lesson/lesson.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserProgress } from "../user-progress/user-progress.entity";

@Entity()
export class Module {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    course_id: number;

    @ManyToOne(() => Course, (course) => course.modules)
    course: Course;

    @Column('text')
    title: string;

    @Column('text', { nullable: true })
    description: string;

    @Column()
    module_order: number;

    @OneToMany(() => Lesson, (lesson) => lesson.module)
    lessons: Lesson[];

    @OneToMany(() => UserProgress, (progress) => progress.module)
    progress: UserProgress[];
}