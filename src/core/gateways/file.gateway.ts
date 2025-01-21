import { StoredFile } from "core/models/stored-file.model";

export interface FileGateway {
    getLast(params: {count: number}): Promise<StoredFile[]>
}