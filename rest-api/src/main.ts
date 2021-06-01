import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ValidationError } from 'class-validator';
import * as mongoose from 'mongoose';

// Module
import { AppModule } from './app.module';

// Filter
import { FallbackExceptionFilter } from './filters/fallback.filter';
import { HttpExceptionFilter } from './filters/http.filter';
import { ValidationFilter } from './filters/valitation.filter';

mongoose.set( 'useFindAndModify', false );

async function bootstrap() {
  const app = await NestFactory.create( AppModule );
  app.setGlobalPrefix( 'api' );
  app.useGlobalFilters(
    new FallbackExceptionFilter(),
    new HttpExceptionFilter(),
    new ValidationFilter()
  );


  app.useGlobalPipes( new ValidationPipe( {
    skipMissingProperties: false,
    exceptionFactory: ( errors: ValidationError[] ) => {
      const messages = errors.map( error => `${ error.property } has wrong value ${ error.value }
      ${ Object.values( error.constraints ).join( '. ' ) }` );
    }
  } ) );

  await app.listen( 9000 );
}

bootstrap();


