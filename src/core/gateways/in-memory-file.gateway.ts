import { StoredFile } from "@/core/models/stored-file.model";
import { FileStorageGateway } from "./file-storage.gateway";

export class InMemoryFileGateway implements FileStorageGateway {
    constructor(private files: StoredFile[]) {}

    getLast(params: {count: number, page: number}): Promise<StoredFile[]> {
        return Promise.resolve(this.files.slice((params.page - 1) * params.count, params.page * params.count))
    }

    upload(params: UploadFileParams): Promise<void> {
        this.files.push(params.file)
        return Promise.resolve()
    }
}