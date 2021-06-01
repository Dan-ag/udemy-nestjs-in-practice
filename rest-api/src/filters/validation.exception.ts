import { BadGatewayException } from '@nestjs/common';


export class ValidationException extends BadGatewayException {

  constructor( public validationErrors: string[] ) {
    super();
  }
}
