import { Dependencies } from "./dependencies"
import { StoredFile } from "./models/stored-file.model"
import { UploadFile } from "./models/upload-file.model"


export type UploadFileParams = {
  folderId?: string,
  sourcePath: string,
  name: string,
  type: 'video'
}
export function createUploadFileFn({fileGateway, nowGateway, authGateway, fileIdGenerator, configGateway}: Dependencies) {
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
      authenticatedUser
    )
    return fileGateway.upload({data: Buffer.from(sourcePath), file})
    .then(() => 
        ({at: now, by: authenticatedUser.name, fileId, folderId: targetFolderId}))
  }
}

export type UploadFileFn = ReturnType<typeof createUploadFileFn>