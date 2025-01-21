import { StoredFile } from "core/models/stored-file.model";
import { FileGateway } from "./file.gateway";

export class FakeFileGateway implements FileGateway {
    constructor(private files: StoredFile[]) {}
    getLast(params: {count: number}): Promise<StoredFile[]> {
        return Promise.resolve(this.files.slice(-params.count))
    }
}