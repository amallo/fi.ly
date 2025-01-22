

import { ConfigGateway } from "./config.gateway";

export class EnvConfigGateway implements ConfigGateway {
    getBaseHost(): string {
        return process.ENV.BASE_HOST ?? ""
    }
    getDefaultFolderId(): string {
        return process.ENV.DEFAULT_FOLDER_ID ?? ""
    }
}