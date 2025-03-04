import {  FileSharingUrl } from "./models/file-sharing.model"
import { ClientDependencies } from "../client-dependencies"

export const createRetrieveFileSharingFn = ({authGateway, fileSharingGateway, configGateway} : ClientDependencies) => {
    return async (params: {fileId: string}) => {
        await authGateway.current()
        const shares = await fileSharingGateway.retrieveByFile(params.fileId)
        return shares.map((share)=>{
            const fileSharingUrl = new FileSharingUrl(configGateway.getBaseHost(), share)
            return {
                shareId: share.id,
                email: share.shareWith.email,
                url: fileSharingUrl.toString()
            }
        })
    }
}

export type RetriveFileSharingFn = ReturnType<typeof createRetrieveFileSharingFn>