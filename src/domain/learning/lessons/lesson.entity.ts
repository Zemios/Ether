import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Module } from '../modules/module.entity';
import { Question } from '../question/question.entity';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  module_id: number;

  @ManyToOne(() => Module, (module) => module.lessons, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'module_id' })
  module: Module;

  @Column({ type: 'varchar', length: 50 })
  title: string;

  @Column('text')
  content: string;

  @Column({ type: 'varchar', length: 20 })
  lesson_type: string;

  @OneToMany(() => Question, (questions) => questions.lesson, { cascade: true })
  questions: Question[];
}
