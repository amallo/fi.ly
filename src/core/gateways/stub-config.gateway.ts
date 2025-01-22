import { ConfigGateway } from "./config.gateway";

export class StubConfigGateway implements ConfigGateway {
    constructor(private readonly baseHost: string, private readonly defaultFolderId: string) {}
    getBaseHost(): string {
        return this.baseHost
    }
    getDefaultFolderId(): string {
        return this.defaultFolderId
    }
}