import { AuthGateway } from "@/core/gateways/auth.gateway";
import { ConfigGateway } from "@/core/gateways/config.gateway";
import { EnvConfigGateway } from "@/core/gateways/env-config.gateway";
import { FakeUploadHandler } from "@/core/gateways/fake-file-upload.handler";
import { FileSharingIdGenerator } from "@/core/gateways/file-sharing-id.generator";
import { FileSharingLinkGenerator } from "@/core/gateways/file-sharing-link.generator";
import { FileSharingGateway } from "@/core/gateways/file-sharing.gateway";
import { FileUploadHandler } from "@/core/gateways/file-upload.handler";
import { FileGateway } from "@/core/gateways/file.gateway";
import { FolderGateway } from "@/core/gateways/folder.gateway";
import { InMemoryFileSharingGateway } from "@/core/gateways/in-memory-file-sharing.gateway";
import { InMemoryFileGateway } from "@/core/gateways/in-memory-file.gateway";
import { InMemoryFolderGateway } from "@/core/gateways/in-memory-folder.gateway";
import { LoggedInAuthGateway } from "@/core/gateways/logged-in-auth.gateway";
import { NanoidFileSharingIdGenerator } from "@/core/gateways/nanoid-file-sharing-id.generator";
import { NanoidShareLinkGenerator } from "@/core/gateways/nanoid-share-link.generator";
import { NowGateway } from "@/core/gateways/now.gateway";
import { RealNowGateway } from "@/core/gateways/real-now.gateway";
import { AuthenticatedUser } from "@/core/models/authenticated-user.model";
import { StubFileSharingIdGenerator } from "./gateways/stub-file-sharing-id.generator";
import { StubFileSharingLinkGenerator } from "./gateways/stub-file-sharing-link.generator";
import { FakeFileGateway } from "./gateways/fake-file.gateway";
import { FakeNowGateway } from "./gateways/fake-now.gateway";
import { FakeFolderGateway } from "./gateways/fake-folder.gateway";
import { StubConfigGateway } from "./gateways/stub-config.gateway";
import { FakeFileSharingGateway } from "./gateways/fake-file-sharing.gateway";

export type Dependencies = {
    nowGateway: NowGateway,
    authGateway: AuthGateway,
    fileSharingGateway: FileSharingGateway,
    shareLinkGenerator: FileSharingLinkGenerator,
    configGateway: ConfigGateway,
    fileSharingIdGenerator: FileSharingIdGenerator,
    fileUploadHandler: FileUploadHandler,
    folderGateway: FolderGateway,
    fileGateway: FileGateway,
}

export const createDevDependencies = (): Dependencies => {
    return {
        folderGateway : new InMemoryFolderGateway([]),
        fileGateway : new InMemoryFileGateway([]),
        nowGateway : new RealNowGateway(),
        authGateway : new LoggedInAuthGateway(new AuthenticatedUser("jean-fei")),
        fileSharingGateway : new InMemoryFileSharingGateway([]),
        configGateway : new EnvConfigGateway(),
        fileSharingIdGenerator : new NanoidFileSharingIdGenerator(),
        shareLinkGenerator : new NanoidShareLinkGenerator(),
        fileUploadHandler : new FakeUploadHandler(),
    }
}

export const createTestDependencies = (deps: Partial<Dependencies>): Dependencies => {
    return {
        folderGateway : new FakeFolderGateway(),
        fileGateway : new FakeFileGateway([]),
        nowGateway : new FakeNowGateway(new Date("2025-01-21T00:00:00Z")),
        authGateway : new LoggedInAuthGateway(new AuthenticatedUser("jean-fei")),
        fileSharingGateway : new FakeFileSharingGateway([]),
        configGateway : new StubConfigGateway("http://app2b.io"),
        fileSharingIdGenerator : new StubFileSharingIdGenerator("share-id"),
        shareLinkGenerator : new StubFileSharingLinkGenerator("test-link"),
        fileUploadHandler : new FakeUploadHandler(),
        ...deps,
    }
}