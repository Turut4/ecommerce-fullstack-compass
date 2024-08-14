import { Injectable } from '@nestjs/common';

@Injectable()
export class SkuService {
  generateSku(color: string, size: string, name: string, id: string): String {
    const nameCode = name.slice(0, 3).toUpperCase();

    return ``;
  }
}
