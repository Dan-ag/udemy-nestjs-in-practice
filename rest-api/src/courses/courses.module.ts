import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Controllers
import { CoursesController } from './controllers/courses.controller';
import { LessonController } from './controllers/lessons.controller';

// Repositories
import { CoursesRepository } from './repositories/courses.repository';
import { LessonRepository } from './repositories/lesson.repository';

// Schemas
import { CoursesSchema } from './schemas/courses.schema';
import { LessonSchema } from './schemas/lesson.schema';

@Module( {
  imports: [ MongooseModule.forFeature( [
    { name: 'Course', schema: CoursesSchema },
    { name: 'Lesson', schema: LessonSchema },
  ] ) ],
  controllers: [
    CoursesController,
    LessonController
  ],
  providers: [
    CoursesRepository,
    LessonRepository
  ]
} )
export class CoursesModule {

}
