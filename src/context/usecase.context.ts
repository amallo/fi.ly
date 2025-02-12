import { AppendFolderFn } from "@/core/file/append-folder";
import { ChangePasswordFn } from "@/core/file/change-password";
import { GetLastVideosFn } from "@/core/file/get-last-videos";
import { ShareFileFn } from "@/core/sharing/share-file";
import { UploadFileFn } from "@/core/file/upload-file";
import React from "react";


export type Usecases = {
    appendFolder: AppendFolderFn,
    getLastVideos: GetLastVideosFn,
    shareFile: ShareFileFn,
    uploadFile: UploadFileFn,
    changePassword: ChangePasswordFn,
}
export const createUseCaseContext = () => {
    const context = React.createContext<Usecases | null>(null);
    return context;
}
