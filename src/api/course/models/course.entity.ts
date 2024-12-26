import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Module } from 'src/api/module/models/module.entity';
import { UserProgress } from "src/api/user-progress/models/user-progress.entity";

@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    title: string;

    @Column('text')
    description: string;

    @Column('int')
    difficulty: number;

    @Column('int')
    estimated_duration: number;
    @Column('simple-array')
    technologies: string[];

    @Column('simple-array')
    content: number[];

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    creation_date: Date;

    @OneToMany(() => Module, (module) => module.course)
    modules: Module[];

    @OneToMany(() => UserProgress, (progress) => progress.course)
    progress: UserProgress[];
}
