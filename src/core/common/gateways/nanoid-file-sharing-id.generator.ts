import { IdGenerator } from "./id.generator";
import { nanoid } from "nanoid";
export class NanoidFileSharingIdGenerator implements IdGenerator {
    generate(): string {
        return nanoid()
    }
}