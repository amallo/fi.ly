import { StoredFile } from "@/core/models/stored-file.model";
import { FileStorageGateway, UploadFileParams } from "./file-storage.gateway";

export class FakeFileStorageGateway implements FileStorageGateway {
    private uploadParams!: UploadFileParams
    constructor(private files: StoredFile[]) {}
    getLast(params: {count: number}): Promise<StoredFile[]> {
        return Promise.resolve(this.files.slice(-params.count))
    }
    upload(params: UploadFileParams): Promise<void> {
        this.uploadParams = params
        return Promise.resolve()
    }
    uploadWasCalledWith(): UploadFileParams {
        return this.uploadParams
    }
}