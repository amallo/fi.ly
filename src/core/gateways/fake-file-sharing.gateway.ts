import { FileSharing } from "../models/file-sharing.model";
import { ChangeFileSharingPasswordArgs, FileSharingGateway } from "./file-sharing.gateway";

export class FakeFileSharingGateway implements FileSharingGateway {
    private shareArgs!: FileSharing
    private changePasswordArgs!: ChangeFileSharingPasswordArgs
    constructor(private fileShares: FileSharing[]) {
    }
    shareHAsBeenCalledWith() {
       return this.shareArgs
    }
    async share(share: FileSharing): Promise<void> {
        this.shareArgs = share
    }
    changePassword(args: ChangeFileSharingPasswordArgs): Promise<void> {
        this.changePasswordArgs = args
        const willUpdateShare = this.fileShares.find(share => share.id === args.shareId)
        if (willUpdateShare) {
            willUpdateShare.changePassword(args.newPassword)
        }
        return Promise.resolve()
    }
    changePasswordHasBeenCalledWith() {
        return this.changePasswordArgs
    }
    getById(id: string): Promise<FileSharing | null> {
        return Promise.resolve(this.fileShares.find(share => share.id === id) || null)
    }
}