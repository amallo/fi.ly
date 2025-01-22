import { IdGenerator } from "./id.generator";

export class FakeFileSharingIdGenerator implements IdGenerator {
    constructor(private id: string) {}
    generate(): string {
        return this.id
    }
}