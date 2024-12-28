import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
import { CourseModule } from './course/course.module';
import { LessonModule } from './lesson/lesson.module';
import { UserLikeModule } from './like/user-like.module';
import { ModuleModule } from './module/module.module';
import { NewsModule } from './news/news.module';
import { PostModule } from './post/post.module';
import { ProjectModule } from './project/project.module';
import { UserProgressModule } from './user-progress/user-progress.module';
import { UserProjectModule } from './user-project/user-project.module';

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
        entities: [__dirname + '/**/models/*.entity{.d.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    CommentModule,
    CourseModule,
    LessonModule,
    UserLikeModule,
    ModuleModule,
    NewsModule,
    PostModule,
    ProjectModule,
    UserProgressModule,
    UserProjectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
