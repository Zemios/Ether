import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './posts/comments/comments.module';
import { CoursesModule } from './courses/courses.module';
import { LessonsModule } from './courses/modules/lessons/lessons.module';
import { UsersLikesModule } from './users/users-likes/users-likes.module';
import { ModulesModule } from './courses/modules/modules.module';
import { NewsModule } from './news/news.module';
import { PostsModule } from './posts/posts.module';
import { ProjectsModule } from './projects/projects.module';
import { UsersProgressModule } from './users/users-progress/users-progress.module';
import { UsersProjectsModule } from './users/users-projects/users-projects.module';
import { User } from './users/models/user.entity';
import { Comment } from './posts/comments/models/comment.entity';
import { Course } from './courses/models/course.entity';
import { Lesson } from './courses/modules/lessons/models/lesson.entity';
import { UserLike } from './users/users-likes/models/user-like.entity';
import { Module as ModuleEntity } from './courses/modules/models/module.entity';
import { News } from './news/models/news.entity';
import { Post } from './posts/models/post.entity';
import { Project } from './projects/models/project.entity';
import { UserProgress } from './users/users-progress/models/user-progress.entity';
import { UserProject } from './users/users-projects/models/user-project.entity';
import { QuestionsModule } from './courses/modules/lessons/questions/questions.module';
import { AnswersModule } from './courses/modules/lessons/questions/answers/answers.module';
import { Question } from './courses/modules/lessons/questions/models/question.entity';
import { Answer } from './courses/modules/lessons/questions/answers/models/answer.entity';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: parseInt(configService.get<string>('DB_PORT')),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [User, Comment, Course, Lesson, UserLike, ModuleEntity, News, Post, Project, UserProgress, UserProject, Question, Answer],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    CommentsModule,
    CoursesModule,
    LessonsModule,
    UsersLikesModule,
    ModulesModule,
    NewsModule,
    PostsModule,
    ProjectsModule,
    UsersProgressModule,
    UsersProjectsModule,
    QuestionsModule,
    AnswersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
