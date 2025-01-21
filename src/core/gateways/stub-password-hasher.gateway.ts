import { PasswordHasherGateway } from "./password-hasher.gateway";

export class StubPasswordHasher implements PasswordHasherGateway {
    constructor(private readonly hashedPassword: string) {}
    hash(): string {
        return this.hashedPassword
    }
}