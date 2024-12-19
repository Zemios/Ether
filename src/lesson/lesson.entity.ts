import { Module } from "src/module/module.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Lesson {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    module_id: number;

    @ManyToOne(() => Module, (module) => module.lessons)
    @JoinColumn({ name: 'module_id' })
    module: Module;

    @Column('text')
    title: string;

    @Column('text', { nullable: true })
    content: string;

    @Column('text', { nullable: true })
    exercise: string;

    @Column()
    lesson_order: number;
}