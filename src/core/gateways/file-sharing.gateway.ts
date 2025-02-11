import { FileSharing } from "../models/file-sharing.model";



export class ChangeFileSharingPasswordArgs {
    constructor(public readonly shareId: string, public readonly newPassword: string, public readonly at: Date) {}
}

export interface FileSharingGateway {
    share(share: FileSharing[]): Promise<void>
    changePassword(args: ChangeFileSharingPasswordArgs): Promise<void>
    getById(id: string): Promise<FileSharing | null>
    retrieveByFile(fileId: string): Promise<FileSharing[]>
}