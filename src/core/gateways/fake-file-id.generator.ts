import { IdGenerator } from "./id.generator";

export class FakeFileIdGenerator implements IdGenerator {
    constructor(private id: string) {}
    generate(): string {
        return this.id
    }
}