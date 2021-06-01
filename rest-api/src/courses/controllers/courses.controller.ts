import { BadRequestException, Body, Controller, Delete, Get, HttpException, Inject, NotFoundException, Param, ParseIntPipe, Post, Put, UseFilters, UseGuards, ValidationPipe } from '@nestjs/common';

// Models
import { Course } from '../../../../shared/course';

// Funtions
import { findAllCourses } from '../../../db-data';

// Filter
import { HttpExceptionFilter } from '../../filters/http.filter';
import { AdminGuard } from '../../guards/admin.guard';
import { AuthenticationGuard } from '../../guards/authentication.guard';
import { ToIntegerPipe } from '../../pipes/to-integer';

// Repository
import { CoursesRepository } from '../repositories/courses.repository';

@Controller( 'courses' )
// @UseGuards( AuthenticationGuard )
export class CoursesController {
  constructor(
    // private courseRepository: CoursesRepository
    @Inject( 'CoursesRepository' ) private courseRepository: CoursesRepository
  ) {
  }


  @Get()
  async findAllCourses(): Promise<Course[]> {
    console.log( this.courseRepository );
    // return findAllCourses();
    return this.courseRepository.findAll();
  }


  @Get( ':courseUrl' )
  async findCourseByUrl(
    @Param( 'courseUrl' ) courseUrl: string
  ): Promise<Course> {
    const course = await this.courseRepository.findCourseByUrl( courseUrl );

    if ( !course ) {
      throw new NotFoundException(
        `Could not find course for url ${ courseUrl }`
      );
    }

    return course;
  }


  @Post()
  @UseGuards( AdminGuard )
  async createCourse(
    @Body() course: Course
  ): Promise<Course> {
    console.log( 'Create course', course );
    return this.courseRepository.addCourse( course );
  }

  @Put( '/:courseId' )
  async updateCourse(
    @Param( 'courseId' ) courseId: string,
    @Body( new ValidationPipe() ) changes: Course
  ): Promise<Course> {

    if ( changes._id ) {
      throw new BadRequestException( "Can't update course id" );
    }

    return this.courseRepository.updateCourse( courseId, changes );
  }

  @Delete( '/:courseId' )
  @UseGuards( AdminGuard )
  async deleteCourse(
    @Param( 'courseId' ) courseId: string,
  ) {
    return this.courseRepository.deleteCourse( courseId );
  }
}
