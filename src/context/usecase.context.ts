import { AppendFolderFn } from "@/core/append-folder";
import { ChangePasswordFn } from "@/core/change-password";
import { GetLastVideosFn } from "@/core/get-last-videos";
import { ShareFileFn } from "@/core/sharing/share-file";
import { UploadFileFn } from "@/core/upload-file";
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
