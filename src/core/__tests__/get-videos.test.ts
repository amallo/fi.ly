import { createTestDependencies } from "core/dependencies";
import { NotLoggedInError } from "core/gateways/auth.gateway";
import { FakeAuthGateway } from "core/gateways/fake-auth.gateway";
import { FakeFileGateway } from "core/gateways/fake-file.gateway";
import { NotLoggedInAuthGateway } from "core/gateways/not-logged-in.gateway";
import { createGetLastVideosFn } from "core/get-last-videos";
import { describe, expect, test } from "vitest";

describe('FEATURE: Jean-Fei gets its videos', () => {
  
    test("Jean fei has no video ", async () => {
      const authGateway = new FakeAuthGateway("jean-fei")
      const fileGateway = new FakeFileGateway([])
      const getLastVideos = createGetLastVideosFn(createTestDependencies({fileGateway, authGateway}))
      const result = await getLastVideos({count: 10, page: 1})
      expect(result).toEqual({ videos: []})
    });

    test("Jean fei must be authenticated", async () => {
        const authGateway = new NotLoggedInAuthGateway()
        const fileGateway = new FakeFileGateway([])
        const getLastVideos = createGetLastVideosFn(createTestDependencies({fileGateway, authGateway}))
        await expect(() =>  getLastVideos({count: 10, page: 1}))
            .rejects.toThrowError(new NotLoggedInError())
    });

    test("Jean fei has 10 videos", async () => {
        const authGateway = new FakeAuthGateway("jean-fei")
        const fileGateway = new FakeFileGateway(Array.from({length: 10}, (_, i) => ({id: `video-${i}`, name: `video-${i}`, url: `https://example.com/video-${i}`, type: "video", createdAt: new Date("2025-01-21T08:19:30.556Z")})))
        const getLastVideos = createGetLastVideosFn(createTestDependencies({fileGateway, authGateway}))
        const result = await getLastVideos({count: 10, page: 1})
        expect(result).toEqual({ videos: Array.from({length: 10}, (_, i) => ({id: `video-${i}`, name: `video-${i}`, url: `https://example.com/video-${i}`, type: "video", createdAt: new Date("2025-01-21T08:19:30.556Z")}))})
    });
});