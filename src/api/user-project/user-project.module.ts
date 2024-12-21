import { Module } from '@nestjs/common';
import { UserProjectController } from './user-project.controller';

@Module({
  controllers: [UserProjectController]
})
export class UserProjectModule {}
