import { IdGenerator } from "./id.generator";

export class FakeFileSharingIdGenerator implements IdGenerator {
    private counter = 0
    constructor(private prefix: string) {}
    generate(): string {
        return `${this.prefix}-${this.counter++}`
    }
}