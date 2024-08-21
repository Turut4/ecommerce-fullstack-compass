import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
interface ClassContructor {
    new (...args: any[]): {};
}
export declare function Serialize(dto: ClassContructor): MethodDecorator & ClassDecorator;
export declare class SerializeInterceptor implements NestInterceptor {
    private dto;
    constructor(dto: ClassContructor);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
export {};
