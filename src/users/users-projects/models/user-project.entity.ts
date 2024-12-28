import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/users/models/user.entity';
import { Project } from 'src/projects/models/project.entity';

@Entity()
export class UserProject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  user_id: number;

  @ManyToOne(() => User, (user) => user.projects)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ nullable: true })
  project_id: number;

  @ManyToOne(() => Project, (project) => project.users)
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @Column('int', { nullable: true })
  pr_approved: number;

  @Column('bool', { default: false })
  is_admin: boolean;
}
