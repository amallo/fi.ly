import { describe, expect, test } from "vitest";
import { createShareFileFn } from "../share-file";
import { FakeAuthGateway } from "../gateways/fake-auth.gateway";
import { FakeNowGateway } from "../gateways/fake-now.gateway";
import { FakeFileSharingGateway } from "../gateways/fake-file-sharing.gateway";
import { FileSharing } from "../models/file-sharing.model";
import { FakeConfigGateway } from "../gateways/fake-config.gateway";
import { FakeFileSharingIdGenerator } from "@/core/gateways/fake-file-sharing-id.generator";
import { createTestDependencies } from "@/core/dependencies";
import { AuthenticatedUser } from "../models/authenticated-user.model";
import { createRetrieveFileSharingFn } from "../retrieve-file-sharing";

describe('FEATURE: Jean-Fei shares a video', () => {

    test('successfully share video tuto-0 to julien and audie for 48hours', async () => {
        const nowGateway = new FakeNowGateway(new Date("2025-01-01T00:00:00.000Z"))
        const authGateway = new FakeAuthGateway(new AuthenticatedUser({id: "jean-fei-id", name: "jean-fei", avatar: "https://i.pravatar.cc/300"}))
        const fileSharingGateway = new FakeFileSharingGateway([])
        const configGateway = new FakeConfigGateway("http://app2b.io", "root-id")
        const sharedIdGenerator = new FakeFileSharingIdGenerator("share-id")
        const shareFile = createShareFileFn(createTestDependencies({
            nowGateway, authGateway, fileSharingGateway, configGateway, fileSharingIdGenerator: sharedIdGenerator}))
        const result = await shareFile({
            fileId: "file-tuto-0", 
            shareWith: [{email: "julien@gmail.com"}, {email: "audie@gmail.com"}], 
            validForHours: 48,
            password: "dingue"
        })

        expect(fileSharingGateway.allSharedFiles()).toEqual([
            new FileSharing({
                id: "share-id-0", 
                fileId: "file-tuto-0", 
                at: new Date("2025-01-01T00:00:00.000Z"), 
                by: "jean-fei-id", 
                expiresAt: new Date("2025-01-03T00:00:00.000Z"), 
                password: "dingue", 
                shareWith : {email: "julien@gmail.com"},
            }),
            new FileSharing({
                id: "share-id-1", 
                fileId: "file-tuto-0", 
                at: new Date("2025-01-01T00:00:00.000Z"), 
                by: "jean-fei-id", 
                expiresAt: new Date("2025-01-03T00:00:00.000Z"), 
                password: "dingue", 
                shareWith : {email: "audie@gmail.com"},
            })
        ])
        expect(result).toEqual({
            fileSharing: [
                {url :'http://julien%40gmail.com@app2b.io/share-id-0'},
                {url :'http://audie%40gmail.com@app2b.io/share-id-1'}
            ]
        })
    })

    test("retrieves file sharings", async () => {
        const authGateway = new FakeAuthGateway(new AuthenticatedUser({id: "jean-fei-id", name: "jean-fei", avatar: "https://i.pravatar.cc/300"}))
        const fileSharingGateway = new FakeFileSharingGateway([])
        fileSharingGateway.willShare(
            [new FileSharing({
                id: "share-id-0", 
                fileId: "file-tuto-0", 
                at: new Date("2025-01-01T00:00:00.000Z"), 
                by: "jean-fei-id", 
                expiresAt: new Date("2025-01-03T00:00:00.000Z"), 
                password: "dingue", 
                shareWith : {email: "julien@gmail.com"},
            }),
            new FileSharing({
                id: "share-id-1", 
                fileId: "file-tuto-0", 
                at: new Date("2025-01-01T00:00:00.000Z"), 
                by: "jean-fei-id", 
                expiresAt: new Date("2025-01-03T00:00:00.000Z"), 
                password: "dingue", 
                shareWith : {email: "audie@gmail.com"},
            })]
        )
        const configGateway = new FakeConfigGateway("http://app2b.io", "root-id")
        const retrieveFileSharings = createRetrieveFileSharingFn(createTestDependencies({authGateway, fileSharingGateway, configGateway}))
        const result = await retrieveFileSharings({
            fileId: "file-tuto-0",
        })
        expect(result).toEqual([
            {shareId :'share-id-0', email: "julien@gmail.com", url: "http://julien%40gmail.com@app2b.io/share-id-0"},
            {shareId :'share-id-1', email: "audie@gmail.com", url: "http://audie%40gmail.com@app2b.io/share-id-1"},
        ])
    })
})
