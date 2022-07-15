import { Roles } from 'src/models/roles.model';
import { createRoleDto } from './dto/create-role.dto';
export declare class RolesService {
    private roleRepository;
    constructor(roleRepository: typeof Roles);
    create(roleDto: createRoleDto): Promise<Roles>;
    getByValue(value: string): Promise<Roles>;
}
