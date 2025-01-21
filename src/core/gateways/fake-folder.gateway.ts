import { Folder } from "../models/folder.model";
import { FolderGateway } from "./folder.gateway";


export class FakeFolderGateway implements FolderGateway {
    private folder!: Folder
    append(folder: Folder): Promise<void> {
        this.folder = folder
        return Promise.resolve()
    }

    appendCalledWithArgs() {
        return this.folder
    }
}