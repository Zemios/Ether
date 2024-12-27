import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Module } from 'src/api/module/models/module.entity';
import { UserProgress } from "src/api/user-progress/models/user-progress.entity";

@Entity()
export class Lesson {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    module_id: number;

    @ManyToOne(() => Module, (module) => module.lessons)
    @JoinColumn({ name: 'module_id' })
    module: Module;

    @Column({ type: 'varchar', length: 50 })
    title: string;

    @Column({ type: 'varchar', length: 280 })
    content: string;

    @Column({ type: 'varchar', length: 255, nullable: true })

    exercise: string;

    @Column()
    lesson_order: number;

    @OneToMany(() => UserProgress, (progress) => progress.lesson)
    progress: UserProgress[];
}