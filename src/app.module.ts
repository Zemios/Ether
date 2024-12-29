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
import { User } from './users/entities/user.entity';
import { Comment } from './posts/comments/entities/comment.entity';
import { Course } from './courses/entities/course.entity';
import { Lesson } from './courses/modules/lessons/entities/lesson.entity';
import { UserLike } from './users/users-likes/entities/user-like.entity';
import { Module as ModuleEntity } from './courses/modules/entities/module.entity';
import { News } from './news/entities/news.entity';
import { Post } from './posts/entities/post.entity';
import { Project } from './projects/entities/project.entity';
import { UserProgress } from './users/users-progress/entities/user-progress.entity';
import { UserProject } from './users/users-projects/entities/user-project.entity';
import { QuestionsModule } from './courses/modules/lessons/questions/questions.module';
import { AnswersModule } from './courses/modules/lessons/questions/answers/answers.module';
import { Question } from './courses/modules/lessons/questions/entities/question.entity';
import { Answer } from './courses/modules/lessons/questions/answers/entities/answer.entity';
import { AuthModule } from './auth/auth.module';


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
        autoLoadEntities: true,
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
    AnswersModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
