"use client"
import { useContext } from "react";
import { createUseCaseContext, Usecases } from "./usecase.context";
import { Dependencies } from "@/core/dependencies";
import { createAppendFolderFn } from "@/core/append-folder";
import { createChangePasswordFn } from "@/core/change-password";
import { createGetLastVideosFn } from "@/core/get-last-videos";
import { createShareFileFn } from "@/core/share-file";
import { createUploadFileFn } from "@/core/upload-file";
import { useDependencies } from "./depencies.provider";

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