"use client"
import { useContext } from "react";
import { createUseCaseContext } from "@/context/usecase.context";
import { createAppendFolderFn } from "@/core/file/append-folder";
import { createChangePasswordFn } from "@/core/file/change-password";
import { createGetLastVideosFn } from "@/core/file/get-last-videos";
import { createShareFileFn } from "@/core/sharing/share-file";
import { createUploadFileFn } from "@/core/file/upload-file";
import { useDependencies } from "@/context/depencies.provider";

const UseCaseContext = createUseCaseContext()
export const UseCasesProvider = ({children}: {children: React.ReactNode}) => {
    const dependencies = useDependencies()
    return <UseCaseContext.Provider value={
        {
            appendFolder: createAppendFolderFn(dependencies),
            getLastVideos: createGetLastVideosFn(dependencies),
            shareFile: createShareFileFn(dependencies),
            uploadFile: createUploadFileFn(dependencies),
            changePassword: createChangePasswordFn(dependencies),
        }
    }>{children}</UseCaseContext.Provider>
}

export const useCases = () => {
    const value = useContext(UseCaseContext)
    if(!value){
        throw new Error("UseCasesProvider not found")
    }
    return value
}