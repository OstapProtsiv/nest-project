import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
// import { Roles } from '../models/roles.model';
import { createRoleDto } from './dto/create-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from '../entity/role.entity';
import { Repository } from 'typeorm';
@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Roles) private roleRepository: Repository<Roles>,
  ) {}

  async create(roleDto: createRoleDto): Promise<Roles> {
    // return this.roleRepository.create(roleDto);
    const createdRole = this.roleRepository.create(roleDto);
    return this.roleRepository.save(createdRole);
  }

  async getByValue(value: string): Promise<Roles> {
    return this.roleRepository.findOne({ where: { value } });
  }
}
