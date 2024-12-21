import { Module } from 'src/api/module/module.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserProgress } from "../user-progress/user-progress.entity";

@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    title: string;

    @Column('json')
    content: any;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    creation_date: Date;

    // Add relationship to modules
    @OneToMany(() => Module, (module) => module.course)
    modules: Module[];

    // Add relationship to user progress
    @OneToMany(() => UserProgress, (progress) => progress.course)
    progress: UserProgress[];
}