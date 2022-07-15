import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Roles } from '../models/roles.model';
import { createRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Roles) private roleRepository: typeof Roles) {}

  async create(roleDto: createRoleDto): Promise<Roles> {
    return await this.roleRepository.create(roleDto);
  }

  async getByValue(value: string): Promise<Roles> {
    return await this.roleRepository.findOne({ where: { value } });
  }
}
