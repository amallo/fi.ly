import { ConfigGateway } from "./config.gateway";

export class StubConfigGateway implements ConfigGateway {
    constructor(private readonly baseHost: string) {}
    getBaseHost(): string {
        return this.baseHost
    }
}