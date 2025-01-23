import { describe, test, expect } from 'vitest';
import { FakeUploadHandler } from '../gateways/fake-file-upload.handler';
import { createUploadFileFn } from '../upload-file';
import { FakeNowGateway } from '../gateways/fake-now.gateway';
import { FakeAuthGateway } from '../gateways/fake-auth.gateway';
import { createTestDependencies } from '@/core/dependencies';
import { FakeConfigGateway } from '../gateways/fake-config.gateway';

describe('FEATURE: Jean-Fei uploads a video', () => {
  test('successfully upload a video to the root folder', async () => {
    const uploadHandler = new FakeUploadHandler()
    const nowGateway = new FakeNowGateway(new Date("2025-01-01T00:00:00.000Z"))
    const authGateway = new FakeAuthGateway("jean-fei")
    const configGateway = new FakeConfigGateway("https://example.com", "root-id")
    const uploadFile = createUploadFileFn(createTestDependencies({fileUploadHandler: uploadHandler, nowGateway, authGateway, configGateway}))
    const result = await uploadFile({name: "awesome video", type: "video", sourcePath: "/path/video.mp4"})
    expect(result).toEqual({fileId: "file-id", folderId: "root-id", at: new Date("2025-01-01T00:00:00.000Z"), by: 'jean-fei'})
  });

  test("successfully upload a video to the personal folder", async () => {
    const uploadHandler = new FakeUploadHandler()
    const nowGateway = new FakeNowGateway(new Date("2025-01-01T00:00:00.000Z"))
    const authGateway = new FakeAuthGateway("jean-fei")
    const uploadFile = createUploadFileFn(createTestDependencies({fileUploadHandler: uploadHandler, nowGateway, authGateway}))
    const result = await uploadFile({ name: "awesome video", sourcePath: "/path/video.mp4", type: "video", folderId: "personal-id"})
    expect(result).toEqual({fileId: "file-id", folderId: "personal-id", at: new Date("2025-01-01T00:00:00.000Z"), by: 'jean-fei'})
  });

});
