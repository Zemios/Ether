import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/users/models/user.entity';
import { Course } from 'src/courses/models/course.entity';
import { Module } from 'src/courses/modules/models/module.entity';
import { Lesson } from 'src/courses/modules/lessons/models/lesson.entity';

@Entity()
export class UserProgress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @ManyToOne(() => User, (user) => user.progress)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ nullable: true })
  course_id: number;

  @ManyToOne(() => Course, (course) => course.progress)
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @Column({ nullable: true })
  module_id: number;

  @ManyToOne(() => Module, (module) => module.progress)
  @JoinColumn({ name: 'module_id' })
  module: Module;

  @Column({ nullable: true })
  lesson_id: number;

  @ManyToOne(() => Lesson, (lesson) => lesson.progress)
  @JoinColumn({ name: 'lesson_id' })
  lesson: Lesson;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  completed_at: Date;
}
