import {BadRequestException, Body, Controller, Delete, Get, HttpException, Param, Post, Put, Req, Res, UseFilters} from '@nestjs/common';
import {Course} from '../../../../shared/course';
import {findAllCourses} from '../../../db-data';
import {CoursesRepository} from '../repositories/courses.repository';
import {Request, Response} from 'express';
import {HttpExceptionFilter} from '../../filters/http.filter';
import {ToIntegerPipe} from '../../pipes/to-integer.pipe';
import {ParseIntPipe} from "@nestjs/common";


@Controller("courses")
export class CoursesController {

    constructor(private coursesDB: CoursesRepository) {

    }

    @Post()
    async createCourse(@Body() course:Course)
        : Promise<Course> {

        console.log("creating new course");

        return this.coursesDB.addCourse(course);
    }

    @Get()
    async findAllCourses(): Promise<Course[]> {
        return this.coursesDB.findAll();
    }

    @Put(':courseId')
    async updateCourse(
        @Param("courseId") courseId:string,
        @Body() changes: Course):Promise<Course> {

        console.log("updating course");

        if (changes._id) {
            throw new BadRequestException("Can't update course id");
        }

        return this.coursesDB.updateCourse(courseId, changes);
    }

    @Delete(':courseId')
    async deleteCourse(@Param("courseId") courseId:string) {

        console.log("deleting course " + courseId);

        return this.coursesDB.deleteCourse(courseId);
    }



}
