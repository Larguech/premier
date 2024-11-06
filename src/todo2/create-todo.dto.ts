// src/todo/dto/create-todo.dto.ts
import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { ValidationMessages } from './validation-messages';
import { StatusEnum } from './status.enum';

export class CreateTodoDto {
  @IsNotEmpty({ message: ValidationMessages.NAME_REQUIRED })
  @IsString()
  @MinLength(3, { message: ValidationMessages.NAME_MIN_LENGTH })
  @MaxLength(10, { message: ValidationMessages.NAME_MAX_LENGTH })
  name: string;

  @IsNotEmpty({ message: ValidationMessages.DESCRIPTION_REQUIRED })
  @IsString()
  @MinLength(10, { message: ValidationMessages.DESCRIPTION_MIN_LENGTH })
  description: string;

  status: StatusEnum;
}
