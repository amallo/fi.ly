import { FileSharing } from "./models/file-sharing.model"
import { Dependencies } from "../dependencies"

export const createShareFileFn = ({nowGateway, authGateway, fileSharingGateway, configGateway, fileSharingIdGenerator} : Dependencies) => {
    return async (params: {fileId: string, shareWith: {email: string}[], validForHours: number, password: string}) => {
        const now = nowGateway.nowIs()
        const currentUser = await authGateway.current()
        const expiresAt = new Date(now.getTime() + params.validForHours * 60 * 60 * 1000)

        const shares = params.shareWith.map((shareWith)=>{
            const willBeSharedWithId = fileSharingIdGenerator.generate()
            const fileSharing = new FileSharing({
                id: willBeSharedWithId, 
                fileId: params.fileId, 
                at: now, 
                by: currentUser.id, 
                expiresAt, 
                password: params.password, 
                shareWith: {email: shareWith.email}})
            return fileSharing
        })
        
        await fileSharingGateway.share(shares)
        return {
            fileSharing: shares.map((share)=>{
                const fileSharingUrl = new URL(configGateway.getBaseHost())
                fileSharingUrl.pathname = share.id
                fileSharingUrl.username = share.shareWith.email
                return {url: fileSharingUrl.toString()}
            })
        }
    }
}

export type ShareFileFn = ReturnType<typeof createShareFileFn>