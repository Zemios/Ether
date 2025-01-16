import { UserLike } from "src/users/users-likes/entities/user-like.entity";
import { Comment } from "../comments/entities/comment.entity";

export class PostDto {
    id: number;
    content: string;
    creation_date: Date;
    user: {
        id: number;
        name: string;
        profile_picture: string;
    };
    comments: Comment[];
    likes: UserLike[];
}
