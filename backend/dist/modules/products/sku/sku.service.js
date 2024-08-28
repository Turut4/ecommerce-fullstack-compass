"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkuService = void 0;
const common_1 = require("@nestjs/common");
const product_entity_1 = require("../../../shared/entities/products/product.entity");
let SkuService = class SkuService {
    generateSku(product) {
        const nameCode = product.name.slice(0, 4).toUpperCase();
        const sizeCode = this.generateSizeCode(product.size);
        const colorCode = product.color.slice(0, 2).toUpperCase();
        return `${nameCode}${sizeCode}${colorCode}`;
    }
    generateSizeCode(size) {
        const sizeNumber = {
            [product_entity_1.Size.SMALL]: 'S',
            [product_entity_1.Size.MEDIUM]: 'M',
            [product_entity_1.Size.LARGE]: 'L',
        };
        return sizeNumber[size];
    }
};
exports.SkuService = SkuService;
exports.SkuService = SkuService = __decorate([
    (0, common_1.Injectable)()
], SkuService);
//# sourceMappingURL=sku.service.js.map