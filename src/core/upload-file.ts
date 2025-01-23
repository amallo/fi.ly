import { Dependencies } from "./dependencies"
import { UploadFile } from "./models/upload-file.model"


export type UploadFileParams = {
  folderId?: string,
  sourcePath: string,
  name: string,
  type: 'video'
}
export function createUploadFileFn({fileUploadHandler, nowGateway, authGateway, fileIdGenerator, configGateway}: Dependencies) {
  return async ({name, type, sourcePath, folderId}: UploadFileParams) => {
    const now = nowGateway.nowIs()
    const authenticatedUser = await authGateway.current()
    const fileId = fileIdGenerator.generate()
    const targetFolderId = folderId ?? configGateway.getDefaultFolderId()
    const uploadFile = new UploadFile(
      fileId,
      authenticatedUser, 
      type, 
      sourcePath, 
      now, 
      targetFolderId,
      name
    )
    return fileUploadHandler.upload(uploadFile)
    .then(() => 
        ({at: now, by: authenticatedUser.name, fileId, folderId: targetFolderId}))
  }
}

export type UploadFileFn = ReturnType<typeof createUploadFileFn>