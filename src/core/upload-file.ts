import { Dependencies } from "./dependencies"
import { UploadFile } from "./models/upload-file.model"

export class UploadFileParams{
  constructor(public readonly title: string, public readonly type: 'video', public readonly sourcePath: string, public readonly targetFolderId: string) {}
}
export function createUploadFileFn({fileUploadHandler, nowGateway, authGateway, fileIdGenerator}: Dependencies) {
  return async ({title, type, sourcePath, targetFolderId: folder}: UploadFileParams) => {
    const now = nowGateway.nowIs()
    const authenticatedUser = await authGateway.current()
    const fileId = fileIdGenerator.generate()
    const uploadFile = new UploadFile(
      fileId,
      authenticatedUser, 
      type, 
      sourcePath, 
      now, 
      folder,
      title
    )
    return fileUploadHandler.upload(uploadFile)
    .then(() => 
        ({at: now, by: authenticatedUser.name, fileId}))
  }
}

export type UploadFileFn = ReturnType<typeof createUploadFileFn>