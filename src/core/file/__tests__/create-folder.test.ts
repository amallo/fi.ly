import { describe, test, expect } from 'vitest';
import { FakeNowGateway } from '@/core/common/gateways/fake-now.gateway';
import { FakeAuthGateway } from '@/core/auth/gateways/fake-auth.gateway';
import { createAppendFolderFn } from '../append-folder';
import { FakeFolderGateway } from '@/core/file/gateways/fake-folder.gateway';
import { createClientDependencies } from '@/core/client-dependencies';
import { AuthenticatedUser } from '../../auth/models/authenticated-user.model';

describe('FEATURE: Jean-Fei appends a folder', () => {
  
  test("successfully create a 'personal' folder on the root folder", async () => {
    const folderGateway = new FakeFolderGateway()
    const nowGateway = new FakeNowGateway(new Date("2025-01-01T00:00:00.000Z"))
    const authGateway = new FakeAuthGateway(new AuthenticatedUser({id: "jean-fei-id", name: "jean-fei", avatar: "https://i.pravatar.cc/300"}))
    const appendFolder = createAppendFolderFn(createClientDependencies({folderGateway, nowGateway, authGateway}))
    const result = await appendFolder({parentId: 'root-id', name: "personal", folderId: 'personal-id'})
    expect(folderGateway.appendCalledWithArgs()).toEqual({props: {parentId: 'root-id', name: "personal", id: 'personal-id'}})
    expect(result).toEqual({ at: new Date("2025-01-01T00:00:00Z"), by: 'jean-fei'})
  });
});
