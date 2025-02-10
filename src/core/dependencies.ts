import { AuthGateway } from "@/core/gateways/auth.gateway";
import { ConfigGateway } from "@/core/gateways/config.gateway";
import { EnvConfigGateway } from "@/core/gateways/env-config.gateway";
import { IdGenerator } from "@/core/gateways/id.generator";
import { FileSharingGateway } from "@/core/gateways/file-sharing.gateway";
import { FileStorageGateway } from "@/core/gateways/file-storage.gateway";
import { FolderGateway } from "@/core/gateways/folder.gateway";
import { InMemoryFileSharingGateway } from "@/core/gateways/in-memory-file-sharing.gateway";
import { InMemoryFolderGateway } from "@/core/gateways/in-memory-folder.gateway";
import { LoggedInAuthGateway } from "@/core/gateways/logged-in-auth.gateway";
import { NowGateway } from "@/core/gateways/now.gateway";
import { RealNowGateway } from "@/core/gateways/real-now.gateway";
import { AuthenticatedUser } from "@/core/models/authenticated-user.model";
import { FakeFileSharingIdGenerator } from "./gateways/fake-file-sharing-id.generator";
import { FakeFileStorageGateway } from "./gateways/fake-file-storage.gateway";
import { FakeNowGateway } from "./gateways/fake-now.gateway";
import { FakeFolderGateway } from "./gateways/fake-folder.gateway";
import { FakeConfigGateway } from "./gateways/fake-config.gateway";
import { FakeFileSharingGateway } from "./gateways/fake-file-sharing.gateway";
import { SupabaseFileStorageGateway } from "./gateways/supabase-file-storage.gateway";
import { createBrowserClient } from "@supabase/ssr/dist/main/createBrowserClient";
import { FakeFileIdGenerator } from "./gateways/fake-file-id.generator";
import { UUIdGenerator } from "./gateways/uuid.generator";

export type Dependencies = {
    nowGateway: NowGateway,
    authGateway: AuthGateway,
    fileSharingGateway: FileSharingGateway,
    configGateway: ConfigGateway,
    fileIdGenerator: IdGenerator,
    fileSharingIdGenerator: IdGenerator,
    folderGateway: FolderGateway,
    fileGateway: FileStorageGateway,
}

export const createDevDependencies = (): Dependencies => {
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_API_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const configGateway = new EnvConfigGateway()
    return {
        folderGateway : new InMemoryFolderGateway([]),
        fileGateway : new SupabaseFileStorageGateway(supabase),
        nowGateway : new RealNowGateway(),
        authGateway : new LoggedInAuthGateway(new AuthenticatedUser({id: "jean-fei-id", name: "jean-fei", avatar: "https://i.pravatar.cc/300"})),
        fileSharingGateway : new InMemoryFileSharingGateway([]),
        configGateway,
        fileSharingIdGenerator : new UUIdGenerator(),
        fileIdGenerator : new UUIdGenerator(),

    }
}

export const createTestDependencies = (deps: Partial<Dependencies>): Dependencies => {
    return {
        folderGateway : new FakeFolderGateway(),
        fileGateway : new FakeFileStorageGateway([]),
        nowGateway : new FakeNowGateway(new Date("2025-01-21T00:00:00Z")),
        authGateway : new LoggedInAuthGateway(new AuthenticatedUser({id: "jean-fei-id", name: "jean-fei", avatar: "https://i.pravatar.cc/300"})),
        fileSharingGateway : new FakeFileSharingGateway([]),
        configGateway : new FakeConfigGateway("http://app2b.io", "root-id"),
        fileIdGenerator : new FakeFileIdGenerator("file-id"),
        fileSharingIdGenerator : new FakeFileSharingIdGenerator("share-id"),
        ...deps,
    }
}