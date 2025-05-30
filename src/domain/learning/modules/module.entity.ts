import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Course } from '../courses/course.entity';
import { Lesson } from '../lessons/lesson.entity';

@Entity()
export class Module {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  course_id: number;

  @ManyToOne(() => Course, (course) => course.modules, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @Column({ type: 'varchar', length: 50 })
  title: string;

  @Column({ type: 'varchar', length: 280, nullable: true })
  description: string;

  @OneToMany(() => Lesson, (lesson) => lesson.module, { cascade: true })
  lessons: Lesson[];
}
