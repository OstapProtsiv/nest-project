import { createRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';
export declare class RolesController {
    private roleService;
    constructor(roleService: RolesService);
    create(createDto: createRoleDto): Promise<import("../models/roles.model").Roles>;
    getByValue(value: string): Promise<import("../models/roles.model").Roles>;
}
