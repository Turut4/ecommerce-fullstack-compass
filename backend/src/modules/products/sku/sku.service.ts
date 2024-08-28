import { Injectable } from '@nestjs/common';
import { Product, Size } from 'src/shared/entities/products/product.entity';

@Injectable()
export class SkuService {
  generateSku(product: Product): string {
    const nameCode = product.name.slice(0, 4).toUpperCase();
    const sizeCode = this.generateSizeCode(product.size);
    const colorCode = product.color.slice(0, 2).toUpperCase();

    return `${nameCode}${sizeCode}${colorCode}`;
  }

  generateSizeCode(size: Size): string {
    const sizeNumber = {
      [Size.SMALL]: 'S',
      [Size.MEDIUM]: 'M',
      [Size.LARGE]: 'L',
    };
    return sizeNumber[size];
  }
}
