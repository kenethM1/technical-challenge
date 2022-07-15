import { ArrayUnique, IsEmail, IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { PhoneCreateDto } from '../../phone/dtos/phone-create.dto';

export class ContactCreateDto {
  @IsOptional()
  id: number;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsOptional()
  @IsEmail()
  emailAddress: string;

  @IsOptional()
  @ValidateNested()
  @ArrayUnique(phoneNumber => phoneNumber.phoneType)
  phoneNumbers: PhoneCreateDto[]
}
