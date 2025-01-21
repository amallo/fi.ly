import { describe, test, expect } from 'vitest';
import { FakeNowGateway } from '../gateways/fake-now.gateway';
import { FakeAuthGateway } from '../gateways/fake-auth.gateway';
import { createAppendFolderFn } from '../append-folder';
import { FakeFolderGateway } from '../gateways/fake-folder.gateway';
import { createTestDependencies } from '@/core/dependencies';

describe('FEATURE: Jean-Fei appends a folder', () => {
  
  test("successfully create a 'personal' folder on the root folder", async () => {
    const folderGateway = new FakeFolderGateway()
    const nowGateway = new FakeNowGateway(new Date("2025-01-01T00:00:00.000Z"))
    const authGateway = new FakeAuthGateway("jean-fei")
    const appendFolder = createAppendFolderFn(createTestDependencies({folderGateway, nowGateway, authGateway}))
    const result = await appendFolder({parentId: 'root-id', name: "personal", folderId: 'personal-id'})
    expect(folderGateway.appendCalledWithArgs()).toEqual({params: {parentId: 'root-id', name: "personal", id: 'personal-id'}})
    expect(result).toEqual({ at: new Date("2025-01-01T00:00:00Z"), by: 'jean-fei'})
  });
});
