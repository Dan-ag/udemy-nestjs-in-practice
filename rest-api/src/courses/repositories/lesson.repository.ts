import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lesson } from '../../../../shared/lesson';

// @Injectable()
export class LessonRepository {

  constructor(
    @InjectModel( 'Lesson' )
    private lessonModel: Model<Lesson>
  ) {

  }

  search(
    courseId: string,
    sortOrder: string,
    pageNumber: number,
    pageSize: number
  ) {

    return this.lessonModel.find( {
      course: courseId
    }, null, {
      limit: pageSize,
      skip: pageNumber,
      sort: {
        seqNo: sortOrder
      },
    } );
  }
}
