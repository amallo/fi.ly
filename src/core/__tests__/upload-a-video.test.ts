import { describe, test, expect } from 'vitest';
import { FakeUploadHandler } from '../gateways/fake-file-upload.handler';
import { createUploadFileFn } from '../upload-file';
import { FakeNowGateway } from '../gateways/fake-now.gateway';
import { FakeAuthGateway } from '../gateways/fake-auth.gateway';
import { createTestDependencies } from '@/core/dependencies';

describe('FEATURE: Jean-Fei uploads a video', () => {
  test('successfully upload a video to the root folder', async () => {
    const uploadHandler = new FakeUploadHandler()
    const nowGateway = new FakeNowGateway(new Date("2025-01-01T00:00:00.000Z"))
    const authGateway = new FakeAuthGateway("jean-fei")
    const uploadFile = createUploadFileFn(createTestDependencies({fileUploadHandler: uploadHandler, nowGateway, authGateway}))
    const result = await uploadFile({id: "video-id-0", type: "video", sourcePath: "/path/video.mp4", targetFolderId: "root-id"})
    expect(result).toEqual({at: new Date("2025-01-01T00:00:00.000Z"), by: 'jean-fei'})
  });

  test("successfully upload a video to the personal folder", async () => {
    const uploadHandler = new FakeUploadHandler()
    const nowGateway = new FakeNowGateway(new Date("2025-01-01T00:00:00.000Z"))
    const authGateway = new FakeAuthGateway("jean-fei")
    const uploadFile = createUploadFileFn(createTestDependencies({fileUploadHandler: uploadHandler, nowGateway, authGateway}))
    const result = await uploadFile({id: "video-id-0", type: "video", sourcePath: "/path/video.mp4", targetFolderId: "personal-id"})
    expect(result).toEqual({at: new Date("2025-01-01T00:00:00Z"), by: 'jean-fei'})
  });

});
