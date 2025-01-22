import { describe, expect, test } from "vitest";
import { createShareFileFn } from "../share-file";
import { FakeAuthGateway } from "../gateways/fake-auth.gateway";
import { FakeNowGateway } from "../gateways/fake-now.gateway";
import { FakeFileSharingGateway } from "../gateways/fake-file-sharing.gateway";
import { FileSharing } from "../models/file-sharing.model";
import { StubFileSharingLinkGenerator } from "../gateways/stub-file-sharing-link.generator";
import { StubConfigGateway } from "../gateways/stub-config.gateway";
import { FakeFileSharingIdGenerator } from "@/core/gateways/fake-file-sharing-id.generator";
import { createTestDependencies } from "@/core/dependencies";

describe('FEATURE: Jean-Fei shares a video', () => {

    test('successfully share video tuto-0 to julien for 48hours', async () => {
        const nowGateway = new FakeNowGateway(new Date("2025-01-01T00:00:00.000Z"))
        const authGateway = new FakeAuthGateway("jean-fei")
        const fileSharingGateway = new FakeFileSharingGateway([])
        const fileSharingLinkGenerator = new StubFileSharingLinkGenerator("this-is-a-link-to-share")
        const configGateway = new StubConfigGateway("http://app2b.io")
        const sharedIdGenerator = new FakeFileSharingIdGenerator("share-id")
        const shareFile = createShareFileFn(createTestDependencies({nowGateway, authGateway, fileSharingGateway, shareLinkGenerator: fileSharingLinkGenerator, configGateway, fileSharingIdGenerator: sharedIdGenerator}))
        const result = await shareFile({
            fileId: "file-tuto-0", 
            shareWith: [{email: "julien@gmail.com", name: "julien"}], 
            validForHours: 48,
            password: "dingue"
        })

        expect(fileSharingGateway.shareHAsBeenCalledWith()).toEqual(new FileSharing("share-id", "file-tuto-0", new Date("2025-01-01T00:00:00.000Z"), "jean-fei", new Date("2025-01-03T00:00:00.000Z"), "dingue", new URL("http://app2b.io/this-is-a-link-to-share")))
        expect(result).toEqual({at: new Date("2025-01-01T00:00:00.000Z"), by: 'jean-fei', expiresAt: new Date("2025-01-03T00:00:00.000Z"), link: "http://app2b.io/this-is-a-link-to-share" })
    })
})
