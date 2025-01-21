import { FileSharingIdGenerator } from "./file-sharing-id.generator";
import { nanoid } from "nanoid";
export class NanoidFileSharingIdGenerator implements FileSharingIdGenerator {
    generate(): string {
        return nanoid()
    }
}