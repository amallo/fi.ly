import { FileSharing } from "./models/file-sharing.model"
import { Dependencies } from "./dependencies"

export const createShareFileFn = ({nowGateway, authGateway, fileSharingGateway, shareLinkGenerator, configGateway, fileSharingIdGenerator} : Dependencies) => {
    return async (params: {fileId: string, shareWith: {email: string, name: string}[], validForHours: number, password: string}) => {
        const now = nowGateway.nowIs()
        const currentUser = await authGateway.current()
        const expiresAt = new Date(now.getTime() + params.validForHours * 60 * 60 * 1000)
        const willBeSharedWithId = fileSharingIdGenerator.generate()
        const url = new URL(configGateway.getBaseHost())
        url.pathname = shareLinkGenerator.generateLink(willBeSharedWithId)
        await fileSharingGateway.share(new FileSharing(willBeSharedWithId, params.fileId, now, currentUser.name, expiresAt, params.password, url))
        return {at: now, by: currentUser.name, expiresAt: new Date(expiresAt), link: url.toString() }
    }
}

export type ShareFileFn = ReturnType<typeof createShareFileFn>