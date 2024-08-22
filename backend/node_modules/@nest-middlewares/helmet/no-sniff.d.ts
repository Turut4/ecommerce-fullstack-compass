import { NestMiddleware } from '@nestjs/common';
export declare class HelmetNoSniffMiddleware implements NestMiddleware {
    use(req: any, res: any, next: any): void;
}
