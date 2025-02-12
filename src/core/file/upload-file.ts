import { ClientDependencies } from "../client-dependencies"
import { StoredFile } from "@/core/file/models/stored-file.model"


export type UploadFileParams = {
  folderId?: string,
  sourcePath: string,
  name: string,
  type: 'video'
}
export function createUploadFileFn({fileGateway, nowGateway, authGateway, fileIdGenerator, configGateway}: ClientDependencies) {
  return async ({name, type, sourcePath, folderId}: UploadFileParams) => {
    const now = nowGateway.nowIs()
    const authenticatedUser = await authGateway.current()
    const fileId = fileIdGenerator.generate()
    const targetFolderId = folderId ?? configGateway.getDefaultFolderId()
    const file = new StoredFile(
      fileId,
      name,
      type, 
      now, 
      targetFolderId,
      authenticatedUser.id
    )
    return fileGateway.upload({data: Buffer.from(sourcePath), file})
    .then(() => 
        ({at: now, by: authenticatedUser.name, fileId, folderId: targetFolderId}))
  }
}

export type UploadFileFn = ReturnType<typeof createUploadFileFn>