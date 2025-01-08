import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserProject } from 'src/users/users-projects/entities/user-project.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 560 })
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  start_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  end_date: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  image: string;

  @Column('simple-array', { nullable: true })
  technologies: string[];

  @Column({ type: 'varchar', length: 255, nullable: true })
  github_link: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  website_link: string;

  @Column({ type: 'varchar', length: 280, nullable: true })
  subtitle: string;

  @OneToMany(() => UserProject, (user) => user.project, { cascade: true })
  users: UserProject[];
}
