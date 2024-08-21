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
const users_service_1 = require("../users.service");
const password_service_1 = require("./password/password.service");
let AuthService = class AuthService {
    constructor(userService, passwordService) {
        this.userService = userService;
        this.passwordService = passwordService;
    }
    async signup(createUserDto) {
        const { email, password, username } = createUserDto;
        const users = await this.userService.find(email);
        const hashedPassword = await this.passwordService.hashPassword(password);
        if (users.length)
            throw new common_1.BadRequestException('Email already in use');
        const user = this.userService.create(email, hashedPassword, username);
        return user;
    }
    async signin(email, password) {
        const [user] = await this.userService.find(email);
        if (!user)
            throw new common_1.BadRequestException('Invalid credentials');
        const isPasswordValid = await this.passwordService.verifyPassword(password, user.password);
        if (!isPasswordValid)
            throw new common_1.BadRequestException('Password not valid');
        return user;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        password_service_1.PasswordService])
], AuthService);
//# sourceMappingURL=auth.service.js.map