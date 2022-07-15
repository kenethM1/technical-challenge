import { ContactCreateDto } from './dtos/contact-create.dto';
import { Injectable } from '@nestjs/common';
import { Contact } from './contact.entity';
import { ContactDto } from './dtos/contact.dto';
import { PhoneMapper } from 'src/phone/phone.mapper';

@Injectable()
export class ContactMapper {
  constructor(
    private readonly phoneMapper: PhoneMapper,
  ) { }

  mapEntityToDto(contact: Contact): ContactDto {
    return {
      id: contact.id,
      firstName: contact.firstName,
      lastName: contact.lastName,
      emailAddress: contact.emailAddress,
      phoneNumbers: contact.phoneNumbers?.map(phoneNumber => this.phoneMapper.mapEntityToDto(phoneNumber))
    };
  }

  mapCreateContactDtoToEntity(dto: ContactCreateDto): Contact {
    return {
      id: dto.id,
      firstName: dto.firstName,
      lastName: dto.lastName,
      emailAddress: dto.emailAddress,
      phoneNumbers: dto.phoneNumbers?.map(phoneNumber => this.phoneMapper.mapCreatePhoneDtoToEntity(phoneNumber))
    };
  }
}
