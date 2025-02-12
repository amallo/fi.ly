

import { ConfigGateway } from "./config.gateway";

export class EnvConfigGateway implements ConfigGateway {
    getBaseHost(): string {
        return process.env.NEXT_PUBLIC_BASE_HOST ?? ""
    }
    getDefaultFolderId(): string {
        return process.env.NEXT_PUBLIC_DEFAULT_FOLDER_ID ?? ""
    }
}