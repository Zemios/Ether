import { Project } from "src/project/project.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProjectCollaborator {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    project_id: number;

    @ManyToOne(() => Project, (project) => project.collaborators)
    @JoinColumn({ name: 'project_id' })
    project: Project;

    @Column({ nullable: true })
    user_id: number;

    @ManyToOne(() => User, (user) => user.projects)
    @JoinColumn({ name: 'user_id' })
    user: User;
}