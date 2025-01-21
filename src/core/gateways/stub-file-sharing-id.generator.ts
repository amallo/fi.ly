import { FileSharingIdGenerator } from "./file-sharing-id.generator";

export class StubFileSharingIdGenerator implements FileSharingIdGenerator {
    constructor(private id: string) {}
    generate(): string {
        return this.id
    }
}