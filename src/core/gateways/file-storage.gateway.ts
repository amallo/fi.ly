import { StoredFile } from "@/core/models/stored-file.model";

export interface FileStorageGateway {
    getLast(params: {count: number}): Promise<StoredFile[]>
}