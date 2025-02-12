import { FileSharing } from "../models/file-sharing.model";
import { ChangeFileSharingPasswordArgs, FileSharingGateway } from "./file-sharing.gateway";

export class FakeFileSharingGateway implements FileSharingGateway {
    private changePasswordArgs!: ChangeFileSharingPasswordArgs
    constructor(private fileShares: FileSharing[] = []) {
    }
    allSharedFiles() {
       return this.fileShares
    }
    willShare(shares: FileSharing[]): void {
        this.fileShares.push(...shares)
    }
    async share(shares: FileSharing[]): Promise<void> {
        this.fileShares.push(...shares)
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
    retrieveByFile(fileId: string): Promise<FileSharing[]> {
        return Promise.resolve(this.fileShares.filter(share => share.fileId === fileId))
    }
}