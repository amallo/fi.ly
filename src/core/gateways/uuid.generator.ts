import { IdGenerator } from "./id.generator";
import { v4 as uuidv4 } from 'uuid';

export class UUIdGenerator implements IdGenerator {    
    generate(): string {
       return uuidv4()
    }
}