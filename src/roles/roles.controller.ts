import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesDec } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../models/roles.model';
import { createRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}
  @ApiOperation({ summary: 'create a role' })
  @ApiResponse({ status: 201, type: Roles })
  @RolesDec(['ADMIN'])
  @UseGuards(RolesGuard)
  @Post()
  async create(@Body() createDto: createRoleDto) {
    return this.roleService.create(createDto);
  }

  @ApiOperation({ summary: 'get a role' })
  @ApiResponse({ status: 200, type: Roles })
  @RolesDec(['ADMIN'])
  @UseGuards(RolesGuard)
  @Get('/:value')
  async getByValue(@Param('value') value: string) {
    return this.roleService.getByValue(value);
  }
}
