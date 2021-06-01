import { BadRequestException, Controller, Get, Inject, ParseIntPipe, Query } from '@nestjs/common';

import { LessonRepository } from '../repositories/lesson.repository';


@Controller( 'lessons' )
export class LessonController {

  constructor(
    @Inject( 'LessonRepository' ) private lessonRepository: LessonRepository
  ) {

  }

  @Get()
  searchLesson(
    @Query( 'courseId' ) courseId: string,
    @Query( 'sortOrder' ) sortOrder: string = 'asc',
    @Query( 'pageNumber', ParseIntPipe ) pageNumber = 0,
    @Query( 'pageSize', ParseIntPipe ) pageSize = 3
  ) {


    if ( !courseId ) {
      throw new BadRequestException( 'courseId must be defined' );
    }

    if ( sortOrder != 'asc' && sortOrder != 'desc' ) {
      throw new BadRequestException( 'sorfOrder must be asc or desc' );
    }

    return this.lessonRepository.search( courseId, sortOrder, pageNumber, pageSize );
  }



}
