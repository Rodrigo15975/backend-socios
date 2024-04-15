import {
  BadRequestException,
  ConflictException,
  HttpException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { HttpStatusCode } from 'axios';

export class HandleErrors {
  handleSendMessage(msg: string, HttpStatus?: HttpStatusCode) {
    throw new HttpException(msg, HttpStatus);
  }
  handleErrorsGeneralUsersNotFounds(msg: string) {
    throw new NotFoundException(msg);
  }
  handleErrorsConflicException(msg: string) {
    throw new ConflictException(msg);
  }
  handleErrorsNotFoundException(msg: string) {
    throw new NotFoundException(msg);
  }
  handleErrorsUnauthorizedException(msg: string) {
    throw new UnauthorizedException(msg);
  }
  handleErrorsBadRequestException(msg: string) {
    throw new BadRequestException(msg);
  }
  handleErrorsInternalServerErrorException(msg: string) {
    throw new InternalServerErrorException(msg);
  }
  handleErrorsGeneral(error: Error): Error {
    if (error instanceof Error) {
      console.log(error);
      return error;
    }
  }
}
