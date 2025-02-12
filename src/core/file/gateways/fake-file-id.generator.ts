import { IdGenerator } from "@/core/common/gateways/id.generator";

export class FakeFileIdGenerator implements IdGenerator {
    constructor(private id: string) {}
    generate(): string {
        return this.id
    }
}