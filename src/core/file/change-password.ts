import { ClientDependencies } from "@/core/client-dependencies"
import { ChangeFileSharingPasswordArgs } from "@/core/sharing/gateways/file-sharing.gateway"

export const createChangePasswordFn = ({nowGateway, authGateway, fileSharingGateway} : ClientDependencies) => {
    return async (params: {id: string, fileId: string, newPassword: string}) => {
        const now = nowGateway.nowIs()
        const currentUser = await authGateway.current()
        await fileSharingGateway.changePassword(new ChangeFileSharingPasswordArgs(params.id, params.newPassword, now))
        const share = await fileSharingGateway.getById(params.id)
        return {
            at: share?.at, 
            by: currentUser.name, 
            expiresAt: share?.expiresAt, 
            link: "http://link" 
        }
    }
}

export type ChangePasswordFn = ReturnType<typeof createChangePasswordFn>