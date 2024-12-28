import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Module } from 'src/api/module/models/module.entity';
import { UserProgress } from "src/api/user-progress/models/user-progress.entity";

export enum courseDifficulty {
    BEGINNER = 'begginer',
    INTERMEDIATE = 'intermediate',
    ADVANCED = 'advanced',
}

@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50 })
    title: string;

    @Column({ type: 'varchar', length: 280 })
    description: string;

    @Column({ type: 'enum', enum: courseDifficulty, default: courseDifficulty.BEGINNER })
    difficulty: courseDifficulty;

    @Column('int')
    estimated_duration: number;
    @Column('simple-array')
    technologies: string[];

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    creation_date: Date;

    @OneToMany(() => Module, (module) => module.course)
    modules: Module[];

    @OneToMany(() => UserProgress, (progress) => progress.course)
    progress: UserProgress[];
}
