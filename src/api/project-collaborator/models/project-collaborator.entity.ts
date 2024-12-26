import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "src/api/project/models/project.entity";
import { User } from "src/api/user/models/user.entity";

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