import { nanoid } from "nanoid";
import { FileSharingLinkGenerator } from "./file-sharing-link.generator";

export class NanoidShareLinkGenerator implements FileSharingLinkGenerator {
    generateLink(seed: string): string {
        return  "share/" + nanoid() + "-" + seed
    }
}