import { AuthModule } from '@application/di/AuthModule';
import { InfrastructureModule } from '@application/di/InfrastructureModule';
import { MediaModule } from '@application/di/MediaModule';
import { CourseModule } from './CourseModule';
import { PostModule } from '@application/di/PostModule';
import { UserModule } from '@application/di/UserModule';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    InfrastructureModule,
    AuthModule,
    UserModule,
    CourseModule,
    MediaModule,
    PostModule,
  ]
})
export class RootModule {}
