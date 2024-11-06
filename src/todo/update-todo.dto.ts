import { IsString, IsOptional, MinLength, MaxLength, IsEnum } from 'class-validator';
import { ValidationMessages } from './validation-messages';
import { StatusEnum } from './status.enum';

export class UpdateTodoDto {
  @IsOptional()
  @IsString()
  @MinLength(3, { message: ValidationMessages.NAME_MIN_LENGTH })
  @MaxLength(10, { message: ValidationMessages.NAME_MAX_LENGTH })
  name?: string;

  @IsOptional()
  @IsString()
  @MinLength(10, { message: ValidationMessages.DESCRIPTION_MIN_LENGTH })
  description?: string;

  @IsOptional()
  @IsEnum(StatusEnum, { message: ValidationMessages.INVALID_STATUS })
  status?: StatusEnum;
}