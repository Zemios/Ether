import { Module } from "src/api/module/module.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserProgress } from "../user-progress/user-progress.entity";

@Entity()
export class Lesson {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    module_id: number;

    @ManyToOne(() => Module, (module) => module.lessons)
    module: Module;

    @Column('text')
    title: string;

    @Column('text', { nullable: true })
    content: string;

    @Column('text', { nullable: true })
    exercise: string;

    @Column()
    lesson_order: number;

    @OneToMany(() => UserProgress, (progress) => progress.lesson)
    progress: UserProgress[];
}