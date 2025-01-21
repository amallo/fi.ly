export interface PasswordHasherGateway {
    hash(password: string): string
}