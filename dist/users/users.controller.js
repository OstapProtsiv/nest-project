"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const roles_decorator_1 = require("../auth/roles.decorator");
const roles_guard_1 = require("../auth/roles.guard");
const user_model_1 = require("../models/user.model");
const validation_pipe_1 = require("../pipes/validation.pipe");
const ban_user_dto_1 = require("./dto/ban-user.dto");
const create_user_dto_1 = require("./dto/create-user.dto");
const give_role_dto_1 = require("./dto/give-role.dto");
const users_service_1 = require("./users.service");
let UsersController = class UsersController {
    constructor(UserService) {
        this.UserService = UserService;
    }
    async getAll() {
        return this.UserService.getAllUsers();
    }
    async createUser(userDto) {
        return this.UserService.createUser(userDto);
    }
    async giveRole(giveDto) {
        return this.UserService.giveRole(giveDto);
    }
    async banUser(banUserDto) {
        return this.UserService.banUser(banUserDto);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all users from the db' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [user_model_1.User] }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a user' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: user_model_1.User }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Give role' }),
    (0, swagger_1.ApiResponse)({ status: 201 }),
    (0, common_1.Post)('giveRole'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [give_role_dto_1.GiveRoleDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "giveRole", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Ban user' }),
    (0, swagger_1.ApiResponse)({ status: 201 }),
    (0, common_1.Post)('ban'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ban_user_dto_1.BanUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "banUser", null);
UsersController = __decorate([
    (0, swagger_1.ApiTags)('users'),
    (0, common_1.Controller)('users'),
    (0, common_1.UsePipes)(validation_pipe_1.ValidationPipe),
    (0, roles_decorator_1.RolesDec)(['ADMIN']),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map