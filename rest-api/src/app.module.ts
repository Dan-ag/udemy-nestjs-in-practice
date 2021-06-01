import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CoursesModule } from './courses/courses.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_CONNECTION } from './courses/config/mongo.config';
import { AuthModule } from './auth/auth.module';
import { GetUserMiddleware } from './middleware/get-user.middleware';
import { CoursesController } from './courses/controllers/courses.controller';
import { LessonController } from './courses/controllers/lessons.controller';

@Module( {
  imports: [
    MongooseModule.forRoot( MONGO_CONNECTION ),
    CoursesModule,
    AuthModule
  ]
} )
export class AppModule implements NestModule {

  configure( consumer: MiddlewareConsumer ): void {

    consumer
      .apply( GetUserMiddleware )
      .forRoutes(
        CoursesController,
        LessonController
      );

  }

}
