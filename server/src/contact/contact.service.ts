import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Contact } from './contact.entity';
import { CONTACT_REPOSITORY } from '../common/constants';
import { ContactDto } from './dtos/contact.dto';

@Injectable()
export class ContactService {

  
  constructor(
    @Inject(CONTACT_REPOSITORY)
    private contactRepository: Repository<Contact>,
  ) { }

  async findAll(): Promise<Contact[]> {
    return this.contactRepository.find();
  }

  async findById(id: number): Promise<Contact | undefined> {
    return this.contactRepository.findOne({ where: { id: id } });
  }

  async create(contact: Contact): Promise<Contact> {
    const result = await this.contactRepository.save(contact);
    return this.contactRepository.findOne({
      where: { id: result?.id },
    });
  }

  async removeById(id: number): Promise<Contact> {
    const contact = this.findById(id);
    ;
    this.contactRepository.createQueryBuilder().delete().from(Contact).where("id=:id",{id:id}).execute();
    return contact;
  }

  async update(contact: Contact): Promise<Contact> {
    var originalContact = await this.findById(contact.id);
    await this.contactRepository.save(Object.assign(originalContact, contact));   
    return this.contactRepository.findOne({ where: { id: contact.id } });
  }
}  
