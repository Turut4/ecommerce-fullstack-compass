export declare class PasswordService {
    hashPassword(password: string): Promise<string>;
    verifyPassword(password: string, storedHash: string): Promise<boolean>;
}
