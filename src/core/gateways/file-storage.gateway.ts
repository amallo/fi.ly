import { StoredFile } from "@/core/models/stored-file.model";

export type UploadFileParams = {
    data: Buffer,
    file: StoredFile
}
export interface FileStorageGateway {
    getLast(params: {count: number}): Promise<StoredFile[]>
    upload(params: UploadFileParams): Promise<void>
}