import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Models
import { Course } from '../../../../shared/course';

// @Injectable()
export class CoursesRepository {

  constructor(
    @InjectModel( 'Course' )
    private courseModel: Model<Course>
  ) {

  }

  async findCourseByUrl( courseUrl: string ): Promise<Course> {
    return this.courseModel.findOne( { url: courseUrl } );
  }

  async findAll(): Promise<Course[]> {
    return this.courseModel.find();
  }
  async addCourse( course: Partial<Course> ): Promise<Course> {

    const newCourse = new this.courseModel( course );

    await newCourse.save();

    return newCourse.toObject( { versionKey: false } );
  }

  async updateCourse( courseId: string, changes: Partial<Course> ): Promise<Course> {
    return this.courseModel.findByIdAndUpdate( { _id: courseId }, changes );
  }

  async deleteCourse( courseId: string ) {
    return this.courseModel.deleteOne( { _id: courseId } );
  }
}
