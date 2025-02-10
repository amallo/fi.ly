import { describe, test, expect } from 'vitest';
import { createUploadFileFn } from '../upload-file';
import { FakeNowGateway } from '../gateways/fake-now.gateway';
import { FakeAuthGateway } from '../gateways/fake-auth.gateway';
import { createTestDependencies } from '@/core/dependencies';
import { FakeConfigGateway } from '../gateways/fake-config.gateway';
import { FakeFileStorageGateway } from '../gateways/fake-file-storage.gateway';
import { AuthenticatedUser } from '../models/authenticated-user.model';

describe('FEATURE: Jean-Fei uploads a video', () => {
  test('successfully upload a video to the root folder', async () => {
    const nowGateway = new FakeNowGateway(new Date("2025-01-01T00:00:00.000Z"))
    const authGateway = new FakeAuthGateway(new AuthenticatedUser({id: "jean-fei-id", name: "jean-fei", avatar: "https://i.pravatar.cc/300"}))
    const fileStorageGateway = new FakeFileStorageGateway([])
    const configGateway = new FakeConfigGateway("https://example.com", "root-id")
    const uploadFile = createUploadFileFn(createTestDependencies({nowGateway, authGateway, configGateway, fileGateway: fileStorageGateway}))
    const result = await uploadFile({name: "awesome video", type: "video", sourcePath: "/path/video.mp4"})
    expect(result).toEqual({fileId: "file-id", folderId: "root-id", at: new Date("2025-01-01T00:00:00.000Z"), by: 'jean-fei'})
    expect(fileStorageGateway.uploadWasCalledWith()).toEqual({data: Buffer.from("/path/video.mp4"), file: {name: "awesome video", type: "video", id: "file-id", folderId: "root-id", by: "jean-fei-id", createdAt: new Date("2025-01-01T00:00:00.000Z")}})
  });

  test("successfully upload a video to the personal folder", async () => {
    const nowGateway = new FakeNowGateway(new Date("2025-01-01T00:00:00.000Z"))
    const authGateway = new FakeAuthGateway(new AuthenticatedUser({id: "jean-fei-id", name: "jean-fei", avatar: "https://i.pravatar.cc/300"}))
    const fileStorageGateway = new FakeFileStorageGateway([])
    const configGateway = new FakeConfigGateway("https://example.com", "root-id")
    const uploadFile = createUploadFileFn(createTestDependencies({nowGateway, authGateway, configGateway, fileGateway: fileStorageGateway}))
    const result = await uploadFile({ name: "awesome video", sourcePath: "/path/video.mp4", type: "video", folderId: "personal-id"})
    expect(result).toEqual({fileId: "file-id", folderId: "personal-id", at: new Date("2025-01-01T00:00:00.000Z"), by: 'jean-fei'})
  });

});
