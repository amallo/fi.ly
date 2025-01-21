import { Dependencies } from "./dependencies"
import { AuthGateway } from "./gateways/auth.gateway"
import { FileUploadHandler } from "./gateways/file-upload.handler"
import { NowGateway } from "./gateways/now.gateway"
import { UploadFile } from "./models/upload-file.model"

export class UploadFileParams{
  constructor(public readonly id: string, public readonly type: 'video', public readonly sourcePath: string, public readonly targetFolderId: string) {}
}
export function createUploadFileFn({fileUploadHandler, nowGateway, authGateway}: Dependencies) {
  return async ({id, type, sourcePath, targetFolderId: folder}: UploadFileParams) => {
    const now = nowGateway.nowIs()
    const authenticatedUser = await authGateway.current()
    const uploadFile = new UploadFile(
      id,
      authenticatedUser, 
      type, 
      sourcePath, 
      now, 
      folder
    )
    return fileUploadHandler.upload(uploadFile)
    .then(() => 
        ({at: now, by: authenticatedUser.name}))
  }
}

export type UploadFileFn = ReturnType<typeof createUploadFileFn>