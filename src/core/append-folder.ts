import { Folder } from "./models/folder.model"
import { Dependencies } from "./dependencies"

export const createAppendFolderFn = ({folderGateway, nowGateway, authGateway} : Dependencies) => {
  return async (folder: {parentId: string, name: string, folderId: string}) => {
    const currentUser = await authGateway.current()
    const folderModel = new Folder({parentId: folder.parentId, name: folder.name, id: folder.folderId})
    await folderGateway.append(folderModel)
    return {  at: nowGateway.nowIs(), by: currentUser.name }
  }
}

export type AppendFolderFn = ReturnType<typeof createAppendFolderFn>