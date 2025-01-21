import { UploadFile } from "../models/upload-file.model"
import { FileUploadHandler } from "./file-upload.handler"

export class FakeUploadHandler implements FileUploadHandler {
  upload(_: UploadFile) {
    return Promise.resolve()
  }
}