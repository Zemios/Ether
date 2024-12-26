import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiModule } from './api/api.module';
import { UserModule } from './api/user/user.module';
import { CommentModule } from './api/comment/comment.module';
import { CourseModule } from './api/course/course.module';
import { LessonModule } from './api/lesson/lesson.module';
import { LikeModule } from './api/like/like.module';
import { ModuleModule } from './api/module/module.module';
import { NewsModule } from './api/news/news.module';
import { PostModule } from './api/post/post.module';
import { ProjectModule } from './api/project/project.module';
import { ProjectCollaboratorModule } from './api/project-collaborator/project-collaborator.module';
import { UserProgressModule } from './api/user-progress/user-progress.module';
import { UserProjectModule } from './api/user-project/user-project.module';

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
        entities: [__dirname + '/api/**/models/*.entity{.d.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    ApiModule,
    UserModule,
    CommentModule,
    CourseModule,
    LessonModule,
    LikeModule,
    ModuleModule,
    NewsModule,
    PostModule,
    ProjectModule,
    ProjectCollaboratorModule,
    UserProgressModule,
    UserProjectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
