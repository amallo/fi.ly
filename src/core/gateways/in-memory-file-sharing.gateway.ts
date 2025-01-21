import { FileSharing } from "core/models/file-sharing.model";
import { ChangeFileSharingPasswordArgs, FileSharingGateway } from "./file-sharing.gateway";

export class InMemoryFileSharingGateway implements FileSharingGateway {
    constructor(private fileSharing: FileSharing[]) {}

    share(fileSharing: FileSharing): Promise<void> {
        this.fileSharing.push(fileSharing)
        return Promise.resolve()
    }

    changePassword(args: ChangeFileSharingPasswordArgs): Promise<void> {
        const fileSharing = this.fileSharing.find(fileSharing => fileSharing.id === args.shareId)
        if (!fileSharing) {
            return Promise.reject(new Error("File sharing not found"))
        }
        fileSharing.changePassword(args.newPassword)
        return Promise.resolve()
    }

    getById(id: string): Promise<FileSharing | null> {
        return Promise.resolve(this.fileSharing.find(fileSharing => fileSharing.id === id) ?? null)
    }
}