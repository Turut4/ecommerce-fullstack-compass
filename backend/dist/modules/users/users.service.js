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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../../shared/entities/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const password_service_1 = require("./auth/password/password.service");
const { faker } = require('@faker-js/faker');
let UsersService = class UsersService {
    constructor(repo, passwordService) {
        this.repo = repo;
        this.passwordService = passwordService;
    }
    async create(email, password, username) {
        const existingUsers = await this.repo.find();
        const user = this.repo.create({ email, password, username });
        if (existingUsers.length <= 0) {
            user.is_admin = true;
        }
        return this.repo.save(user);
    }
    async find(email) {
        const users = await this.repo.findBy({ email });
        return users;
    }
    async findOne(id) {
        const user = await this.repo.findOneBy({ id });
        return user;
    }
    async update(id, updateUserDto) {
        const user = await this.findOne(id);
        if (!user)
            throw new common_1.NotFoundException(`User ${id} not found`);
        const isPasswordValid = await this.passwordService.verifyPassword(updateUserDto.confirmPassword, user.password);
        if (!isPasswordValid)
            throw new common_1.BadRequestException('Password is not correct');
        if (updateUserDto.password) {
            updateUserDto.password = await this.passwordService.hashPassword(updateUserDto.password);
        }
        Object.assign(user, updateUserDto);
        return await this.repo.save(user);
    }
    async remove(id) {
        const user = await this.findOne(id);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return this.repo.remove(user);
    }
    async createRandomUsers(count) {
        if (process.env.NODE_ENV === 'development') {
            function createRandomUser() {
                return {
                    id: faker.string.uuid(),
                    email: faker.internet.email(),
                    password: faker.internet.password(),
                    username: faker.internet.userName(),
                };
            }
            const users = await Promise.all(Array.from({ length: count }, async () => {
                const user = createRandomUser();
                return user;
            }));
            return await this.repo.save(users);
        }
    }
    async turnAdmin(id) {
        const user = await this.findOne(id);
        user.is_admin = true;
        return this.repo.save(user);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        password_service_1.PasswordService])
], UsersService);
//# sourceMappingURL=users.service.js.map