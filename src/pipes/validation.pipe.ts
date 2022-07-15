import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from '../exceptions/validation.exceprion';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const objToValid = plainToInstance(metatype, value);
    const errors = await validate(objToValid);
    console.log(errors);

    if (errors.length > 0) {
      const messages = errors.map((error) => {
        const errMessages: string =
          error.property.toString() +
          ' - ' +
          Object.values(error.constraints).join(', ');
        return errMessages;
      });
      console.log(messages);

      throw new ValidationException(messages);
    }
    return value;
  }
  toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
