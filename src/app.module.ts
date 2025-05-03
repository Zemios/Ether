import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './interfaces/http/users/users.module';
import { CoursesModule } from './interfaces/http/learning/courses/courses.module';
import { LessonsModule } from './interfaces/http/learning/lessons/lessons.module';
import { ModulesModule } from './interfaces/http/learning/modules/modules.module';
import { QuestionsModule } from './interfaces/http/learning/questions/questions.module';
import { AnswersModule } from './interfaces/http/learning/answers/answers.module';
import { AuthModule } from './interfaces/http/auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

console.log(join(__dirname, '..', 'uploads/profile-pics'));

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'uploads', 'profile-pics'),
      serveRoot: '/profile-pics',
    }),
    ThrottlerModule.forRoot([{
      ttl: 5000,
      limit: 20,
    }]),
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'production' ? '.env' : '.env.local'
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: parseInt(configService.get<string>('DB_PORT') || '3306'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    CoursesModule,
    LessonsModule,
    ModulesModule,
    QuestionsModule,
    AnswersModule,
    AuthModule
  ],
  controllers: [],
  providers: [{
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }],
})
export class AppModule { }
