import { describe, test, expect } from "vitest"
import { FakeAuthGateway } from "@/core/auth/gateways/fake-auth.gateway"
import { FakeFileSharingGateway } from "../../sharing/gateways/fake-file-sharing.gateway"
import { FakeNowGateway } from "@/core/common/gateways/fake-now.gateway"
import { ChangeFileSharingPasswordArgs } from "../../sharing/gateways/file-sharing.gateway"
import { createChangePasswordFn } from "../change-password"
import { FileSharing } from "../../sharing/models/file-sharing.model"
import { createClientDependencies } from "@/core/client-dependencies"
import { AuthenticatedUser } from "../../auth/models/authenticated-user.model"

describe('change file sharing password', () => {
    test('successfully change password', async () => {
        const nowGateway = new FakeNowGateway(new Date("2025-01-01T15:00:00.000Z"))
        const authGateway = new FakeAuthGateway(new AuthenticatedUser({id: "jean-fei-id", name: "jean-fei", avatar: "https://i.pravatar.cc/300"}))
        const fileSharingGateway = new FakeFileSharingGateway([
            new FileSharing({id: "share-id", fileId: "file-tuto-0", at: new Date("2025-01-01T15:00:00.000Z"), by: "jean-fei", expiresAt: new Date("2025-01-03T00:00:00.000Z"), password: "old-password", shareWith: {email: "julien@gmail.com"}})
        ])
        
        const shareFile = createChangePasswordFn(createClientDependencies({nowGateway, authGateway, fileSharingGateway}))
        const result = await shareFile({
            id: 'share-id', 
            fileId: "file-tuto-0",
            newPassword: "new-password"
        })
        expect(fileSharingGateway.changePasswordHasBeenCalledWith()).toEqual(new ChangeFileSharingPasswordArgs('share-id', 'new-password', new Date("2025-01-01T15:00:00.000Z")))
        
        expect(result).toEqual({
            at: new Date("2025-01-01T15:00:00.000Z"), 
            by: 'jean-fei', 
            expiresAt: new Date("2025-01-03T00:00:00.000Z"), 
            link: "http://link" 
        })
    })
})