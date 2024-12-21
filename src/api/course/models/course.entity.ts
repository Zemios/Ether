import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Module } from 'src/api/module/models/module.entity';
import { UserProgress } from "src/api/user-progress/models/user-progress.entity";

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