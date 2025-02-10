import { FileSharing, FileSharingUrl } from "./models/file-sharing.model"
import { Dependencies } from "./dependencies"

export const createShareFileFn = ({nowGateway, authGateway, fileSharingGateway, configGateway, fileSharingIdGenerator} : Dependencies) => {
    return async (params: {fileId: string, shareWith: {email: string, name: string}[], validForHours: number, password: string}) => {
        const now = nowGateway.nowIs()
        const currentUser = await authGateway.current()
        const expiresAt = new Date(now.getTime() + params.validForHours * 60 * 60 * 1000)
        const willBeSharedWithId = fileSharingIdGenerator.generate()
        const fileSharing = new FileSharingUrl(new URL(configGateway.getBaseHost()), willBeSharedWithId)
        await fileSharingGateway.share(new FileSharing({
            id: willBeSharedWithId, 
            fileId: params.fileId, 
            at: now, 
            by: currentUser.name, 
            expiresAt, 
            password: params.password, 
            link: fileSharing}))
        return {at: now, by: currentUser.name, expiresAt: new Date(expiresAt), link: fileSharing.url().toString() }
    }
}

export type ShareFileFn = ReturnType<typeof createShareFileFn>