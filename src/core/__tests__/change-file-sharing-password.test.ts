import { describe, test, expect } from "vitest"
import { FakeAuthGateway } from "../gateways/fake-auth.gateway"
import { FakeFileSharingGateway } from "../gateways/fake-file-sharing.gateway"
import { FakeNowGateway } from "../gateways/fake-now.gateway"
import { ChangeFileSharingPasswordArgs } from "../gateways/file-sharing.gateway"
import { createChangePasswordFn } from "../change-password"
import { FileSharing, FileSharingUrl } from "../models/file-sharing.model"
import { createTestDependencies } from "@/core/dependencies"
import { AuthenticatedUser } from "../models/authenticated-user.model"

describe('change file sharing password', () => {
    test('successfully change password', async () => {
        const nowGateway = new FakeNowGateway(new Date("2025-01-01T15:00:00.000Z"))
        const authGateway = new FakeAuthGateway(new AuthenticatedUser({id: "jean-fei-id", name: "jean-fei", avatar: "https://i.pravatar.cc/300"}))
        const fileSharingGateway = new FakeFileSharingGateway([
            new FileSharing({id: "share-id", fileId: "file-tuto-0", at: new Date("2025-01-01T15:00:00.000Z"), by: "jean-fei", expiresAt: new Date("2025-01-03T00:00:00.000Z"), password: "old-password", link: new FileSharingUrl(new URL("http://link"), "share-id")})
        ])
        
        const shareFile = createChangePasswordFn(createTestDependencies({nowGateway, authGateway, fileSharingGateway}))
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