import { Folder } from "core/models/folder.model";
import { FolderGateway } from "./folder.gateway";

export class InMemoryFolderGateway implements FolderGateway {
    constructor(private folders: Folder[]) {}

    append(folder: Folder): Promise<void> {
        this.folders.push(folder)
        return Promise.resolve()
    }
}