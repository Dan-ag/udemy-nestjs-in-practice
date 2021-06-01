import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';

export class ToIntegerPipe implements PipeTransform {
  transform( value: any, metadata: ArgumentMetadata ) {

    const val = parseInt( value );

    if ( isNaN( val ) ) {
      throw new BadRequestException( `Conversion to number failed ${ val }` );
    }

    return val;
  }

}
