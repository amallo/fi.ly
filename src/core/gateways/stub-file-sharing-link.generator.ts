import { FileSharingLinkGenerator } from "./file-sharing-link.generator";

export class StubFileSharingLinkGenerator implements FileSharingLinkGenerator {
    constructor(private readonly link: string) {}
    generateLink(): string {
        return this.link
    }
}