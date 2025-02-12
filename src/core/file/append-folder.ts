import { Folder } from "@/core/file/models/folder.model"
import { ClientDependencies } from "@/core/client-dependencies"

export const createAppendFolderFn = ({folderGateway, nowGateway, authGateway} : ClientDependencies) => {
  return async (folder: {parentId: string, name: string, folderId: string}) => {
    const currentUser = await authGateway.current()
    const folderModel = new Folder({parentId: folder.parentId, name: folder.name, id: folder.folderId})
    await folderGateway.append(folderModel)
    return {  at: nowGateway.nowIs(), by: currentUser.name }
  }
}

export type AppendFolderFn = ReturnType<typeof createAppendFolderFn>