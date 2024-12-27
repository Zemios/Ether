import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "src/api/user/models/user.entity";
import { Post } from "src/api/post/models/post.entity";
import { News } from "src/api/news/models/news.entity";

export enum LikeType {
    POST = 'post',
    NEWS = 'news',
}

@Entity()
export class UserLike {
    @PrimaryColumn()
    user_id: number;

    @ManyToOne(() => User, (user) => user.likes)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @PrimaryColumn({ type: 'enum', enum: LikeType })
    like_type: LikeType;

    @PrimaryColumn()
    target_id: number;

    @ManyToOne(() => Post, (post) => post.likes, { nullable: true })
    @JoinColumn({ name: 'entity_id' })
    post: Post;

    @ManyToOne(() => News, (news) => news.likes, { nullable: true })
    @JoinColumn({ name: 'entity_id' })
    news: News;
}
