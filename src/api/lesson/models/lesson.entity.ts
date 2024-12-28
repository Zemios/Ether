import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Module } from 'src/api/module/models/module.entity';
import { UserProgress } from 'src/api/user-progress/models/user-progress.entity';
import { Question } from 'src/api/question/models/question.entity';

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

  @Column('text')
  content: string;

  @Column({ type: 'varchar', length: 20 })
  lesson_type: string;

  @OneToMany(() => UserProgress, (progress) => progress.lesson)
  progress: UserProgress[];

  @OneToMany(() => Question, (questions) => questions.lesson)
  questions: Question[];
}
