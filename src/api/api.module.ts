import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { UserModule } from './user/user.module';
import { RouterModule } from '@nestjs/core';
import { CommentModule } from './comment/comment.module';
import { CourseModule } from './course/course.module';
import { LessonModule } from './lesson/lesson.module';
import { UserLikeModule } from './like/user-like.module';
import { ModuleModule } from './module/module.module';
import { NewsModule } from './news/news.module';
import { PostModule } from './post/post.module';
import { ProjectModule } from './project/project.module';
import { ProjectCollaboratorModule } from './project-collaborator/project-collaborator.module';
import { UserProgressModule } from './user-progress/user-progress.module';
import { UserProjectModule } from './user-project/user-project.module';

@Module({
  controllers: [ApiController],
  imports: [
    RouterModule.register([
      {
        path: 'api',
        module: ApiModule,
        children: [
          {
            path: 'user',
            module: UserModule,
          },
          {
            path: 'comment',
            module: CommentModule,
          },
          {
            path: 'course',
            module: CourseModule,
          },
          {
            path: 'lesson',
            module: LessonModule,
          },
          {
            path: 'user-like',
            module: UserLikeModule,
          },
          {
            path: 'module',
            module: ModuleModule,
          },
          {
            path: 'news',
            module: NewsModule,
          },
          {
            path: 'post',
            module: PostModule,
          },
          {
            path: 'project',
            module: ProjectModule,
          },
          {
            path: 'project-collaborator',
            module: ProjectCollaboratorModule,
          },
          {
            path: 'user-progress',
            module: UserProgressModule,
          },
          {
            path: 'user-project',
            module: UserProjectModule,
          },
        ],
      },
    ]),
    UserModule,
    CommentModule,
    CourseModule,
    LessonModule,
    UserLikeModule,
    ModuleModule,
    NewsModule,
    PostModule,
    ProjectModule,
    ProjectCollaboratorModule,
    UserProgressModule,
    UserProjectModule,
  ],
})
export class ApiModule { }
