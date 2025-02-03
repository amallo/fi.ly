import { describe, expect, test } from "vitest";
import { createShareFileFn } from "../share-file";
import { FakeAuthGateway } from "../gateways/fake-auth.gateway";
import { FakeNowGateway } from "../gateways/fake-now.gateway";
import { FakeFileSharingGateway } from "../gateways/fake-file-sharing.gateway";
import { FileSharing, FileSharingUrl } from "../models/file-sharing.model";
import { FakeConfigGateway } from "../gateways/fake-config.gateway";
import { FakeFileSharingIdGenerator } from "@/core/gateways/fake-file-sharing-id.generator";
import { createTestDependencies } from "@/core/dependencies";
import { AuthenticatedUser } from "../models/authenticated-user.model";

describe('FEATURE: Jean-Fei shares a video', () => {

    test('successfully share video tuto-0 to julien for 48hours', async () => {
        const nowGateway = new FakeNowGateway(new Date("2025-01-01T00:00:00.000Z"))
        const authGateway = new FakeAuthGateway(new AuthenticatedUser("jean-fei-id", "jean-fei", "https://i.pravatar.cc/300"))
        const fileSharingGateway = new FakeFileSharingGateway([])
        const configGateway = new FakeConfigGateway("http://app2b.io", "root-id")
        const sharedIdGenerator = new FakeFileSharingIdGenerator("share-id")
        const shareFile = createShareFileFn(createTestDependencies({nowGateway, authGateway, fileSharingGateway, configGateway, fileSharingIdGenerator: sharedIdGenerator}))
        const result = await shareFile({
            fileId: "file-tuto-0", 
            shareWith: [{email: "julien@gmail.com", name: "julien"}], 
            validForHours: 48,
            password: "dingue"
        })


        expect(fileSharingGateway.shareHAsBeenCalledWith()).toEqual(
            new FileSharing(
                "share-id", 
                "file-tuto-0", 
                new Date("2025-01-01T00:00:00.000Z"), 
                "jean-fei", 
                new Date("2025-01-03T00:00:00.000Z"), 
                "dingue", 
                new FileSharingUrl(new URL("http://app2b.io"), "share-id")
                )
        )
        expect(result).toEqual({at: new Date("2025-01-01T00:00:00.000Z"), by: 'jean-fei', expiresAt: new Date("2025-01-03T00:00:00.000Z"), link: "http://app2b.io/share-id" })
    })
})
