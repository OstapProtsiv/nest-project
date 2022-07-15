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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcryptjs");
const users_service_1 = require("src/users/users.service");
let AuthService = class AuthService {
    constructor(jwtService, UsersService) {
        this.jwtService = jwtService;
        this.UsersService = UsersService;
    }
    async login(userDto) {
        console.log(this.jwtService);
        const user = await this.validateUser(userDto);
        return this.createToken(user);
    }
    async registration(userDto) {
        const candidate = await this.UsersService.findUserByEmail(userDto.email);
        if (candidate) {
            throw new common_1.HttpException('person with such email already exists', common_1.HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(userDto.password, 4);
        const createdUser = await this.UsersService.createUser(Object.assign(Object.assign({}, userDto), { password: hashPassword }));
        return this.createToken(createdUser);
    }
    createToken(user) {
        return this.jwtService.sign({
            email: user.email,
            roles: user.roles,
            id: user.id,
        });
    }
    async validateUser(userDto) {
        const user = await this.UsersService.findUserByEmail(userDto.email);
        if (!user) {
            throw new common_1.HttpException('wrong email or password', common_1.HttpStatus.BAD_REQUEST);
        }
        const isEqualsPasswords = await bcrypt.compare(userDto.password, user.password);
        if (!isEqualsPasswords) {
            throw new common_1.HttpException('wrong email or password', common_1.HttpStatus.BAD_REQUEST);
        }
        return user;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        users_service_1.UsersService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map