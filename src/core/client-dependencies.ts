import { AuthGateway } from "@/core/auth/gateways/auth.gateway";
import { ConfigGateway } from "@/core/config/gateways/config.gateway";
import { EnvConfigGateway } from "@/core/config/gateways/env-config.gateway";
import { IdGenerator } from "@/core/common/gateways/id.generator";
import { FileSharingGateway } from "@/core/sharing/gateways/file-sharing.gateway";
import { FileStorageGateway } from "@/core/file/gateways/file-storage.gateway";
import { FolderGateway } from "@/core/file/gateways/folder.gateway";
import { InMemoryFileSharingGateway } from "@/core/sharing/gateways/in-memory-file-sharing.gateway";
import { InMemoryFolderGateway } from "@/core/file/gateways/in-memory-folder.gateway";
import { LoggedInAuthGateway } from "@/core/auth/gateways/logged-in-auth.gateway";
import { NowGateway } from "@/core/common/gateways/now.gateway";
import { RealNowGateway } from "@/core/common/gateways/real-now.gateway";
import { AuthenticatedUser } from "@/core/auth/models/authenticated-user.model";
import { FakeFileSharingIdGenerator } from "./sharing/gateways/fake-file-sharing-id.generator";
import { FakeFileStorageGateway } from "./file/gateways/fake-file-storage.gateway";
import { FakeNowGateway } from "@/core/common/gateways/fake-now.gateway";
import { FakeFolderGateway } from "@/core/file/gateways/fake-folder.gateway";
import { FakeConfigGateway } from "@/core/config/gateways/fake-config.gateway";
import { FakeFileSharingGateway } from "./sharing/gateways/fake-file-sharing.gateway";
import { SupabaseFileStorageGateway } from "@/core/file/gateways/supabase-file-storage.gateway";
import { createBrowserClient } from "@supabase/ssr/dist/main/createBrowserClient";
import { FakeFileIdGenerator } from "@/core/file/gateways/fake-file-id.generator";
import { UUIdGenerator } from "./common/gateways/uuid.generator";

export type ClientDependencies = {
    nowGateway: NowGateway,
    authGateway: AuthGateway,
    fileSharingGateway: FileSharingGateway,
    configGateway: ConfigGateway,
    fileIdGenerator: IdGenerator,
    fileSharingIdGenerator: IdGenerator,
    folderGateway: FolderGateway,
    fileGateway: FileStorageGateway,
}



export const createClientDependencies = (deps: Partial<ClientDependencies>): ClientDependencies => {
    if(process.env.NODE_ENV === "test"){
        return createTestDependencies(deps)
    }
    if(process.env.NODE_ENV === "development"){
        return createDevDependencies()
    }
    return createDevDependencies()
}

const createDevDependencies = (): ClientDependencies => {
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

const createTestDependencies = (deps: Partial<ClientDependencies>): ClientDependencies => {
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