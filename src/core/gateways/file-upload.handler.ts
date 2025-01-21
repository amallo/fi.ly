import { UploadFile } from "../models/upload-file.model";

export interface FileUploadHandler {
  upload(file: UploadFile): Promise<void>
}