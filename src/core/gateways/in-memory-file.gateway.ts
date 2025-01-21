import { StoredFile } from "core/models/stored-file.model";
import { FileGateway } from "./file.gateway";

export class InMemoryFileGateway implements FileGateway {
    constructor(private files: StoredFile[]) {}

    getLast(params: {count: number, page: number}): Promise<StoredFile[]> {
        return Promise.resolve(this.files.slice((params.page - 1) * params.count, params.page * params.count))
    }
}