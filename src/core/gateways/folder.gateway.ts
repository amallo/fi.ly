import { Folder } from "../models/folder.model";

export interface FolderGateway {
  append(folder: Folder): Promise<void>
}