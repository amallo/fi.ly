

import { ConfigGateway } from "./config.gateway";

export class EnvConfigGateway implements ConfigGateway {
    getBaseHost(): string {
        return window.ENV.BASE_HOST ?? ""
    }
}