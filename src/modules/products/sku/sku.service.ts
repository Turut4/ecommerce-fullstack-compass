import { Injectable } from '@nestjs/common';
import { CreateProductDto } from 'src/shared/dtos/product/create-product.dto';
import { Size } from 'src/shared/entities/product.entity';

@Injectable()
export class SkuService {
  generateSku(product: CreateProductDto): string {
    const nameCode = product.name.slice(0, 4).toUpperCase();
    const sizeCode = this.generateSizeCode(product.size);
    const colorCode = product.color.slice(0, 2).toUpperCase();

    return `${nameCode}${sizeCode}${colorCode}`;
  }

  generateSizeCode(size: Size): string {
    const sizeNumber = {
      [Size.SMALL]: '01',
      [Size.MEDIUM]: '02',
      [Size.LARGE]: '03',
    };
    return sizeNumber[size];
  }
}