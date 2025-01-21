import { StoredFile } from "@/core/models/stored-file.model";
import { FileStorageGateway } from "./file-storage.gateway";

export class FakeFileStorageGateway implements FileStorageGateway {
    constructor(private files: StoredFile[]) {}
    getLast(params: {count: number}): Promise<StoredFile[]> {
        return Promise.resolve(this.files.slice(-params.count))
    }
}