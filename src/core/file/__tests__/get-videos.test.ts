import { createClientDependencies } from "@/core/client-dependencies";
import { NotLoggedInError } from "@/core/auth/gateways/auth.gateway";
import { FakeAuthGateway } from "@/core/auth/gateways/fake-auth.gateway";
import { FakeFileStorageGateway } from "@/core/file/gateways/fake-file-storage.gateway";
import { NotLoggedInAuthGateway } from "@/core/auth/gateways/not-logged-in.gateway";
import { createGetLastVideosFn } from "@/core/file/get-last-videos";
import { describe, expect, test } from "vitest";
import { AuthenticatedUser } from "../../auth/models/authenticated-user.model";

describe('FEATURE: Jean-Fei gets its videos', () => {
  
    test("Jean fei has no video ", async () => {
      const authGateway = new FakeAuthGateway(new AuthenticatedUser({id: "jean-fei-id", name: "jean-fei", avatar: "https://i.pravatar.cc/300"}))
      const fileGateway = new FakeFileStorageGateway([])
      const getLastVideos = createGetLastVideosFn(createClientDependencies({fileGateway, authGateway}))
      const result = await getLastVideos({count: 10, page: 1})
      expect(result).toEqual({ videos: []})
    });

    test("Jean fei must be authenticated", async () => {
        const authGateway = new NotLoggedInAuthGateway()
        const fileGateway = new FakeFileStorageGateway([])
        const getLastVideos = createGetLastVideosFn(createClientDependencies({fileGateway, authGateway}))
        await expect(() =>  getLastVideos({count: 10, page: 1}))
            .rejects.toThrowError(new NotLoggedInError())
    });

    test("Jean fei has 10 videos", async () => {
        const authGateway = new FakeAuthGateway(new AuthenticatedUser({id: "jean-fei-id", name: "jean-fei", avatar: "https://i.pravatar.cc/300"}))
        const fileGateway = new FakeFileStorageGateway(Array.from({length: 10}, (_, i) => ({id: `video-${i}`, name: `video-${i}`, type: "video", by: "jean-fei", createdAt: new Date("2025-01-21T08:19:30.556Z"), folderId: "root-id"})))
        const getLastVideos = createGetLastVideosFn(createClientDependencies({fileGateway, authGateway}))
        const result = await getLastVideos({count: 10, page: 1})
        expect(result).toEqual({ videos: Array.from({length: 10}, (_, i) => (
            {id: `video-${i}`, name: `video-${i}`, type: "video", createdAt: new Date("2025-01-21T08:19:30.556Z"), by: "jean-fei", folderId: "root-id"}))})
    });
});