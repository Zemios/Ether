import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Course {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    title: string;

    @Column('json')
    content: any;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    creation_date: Date;
}