import { Roles } from 'src/models/roles.model';
import { createRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';
export declare class RolesController {
    private roleService;
    constructor(roleService: RolesService);
    create(createDto: createRoleDto): Promise<Roles>;
    getByValue(value: string): Promise<Roles>;
}
