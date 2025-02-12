type ShareWithOptions = {email: string}
export class FileSharing {
    public readonly id: string
    public readonly fileId: string
    public readonly at: Date
    public readonly by: string
    public readonly expiresAt: Date
    private password: string
    public readonly shareWith: ShareWithOptions
    constructor(props : {id: string, fileId: string, at: Date, by: string, expiresAt: Date, password: string, shareWith: ShareWithOptions}) {
        this.id = props.id
        this.fileId = props.fileId
        this.at = props.at
        this.by = props.by
        this.expiresAt = props.expiresAt
        this.password = props.password
        this.shareWith = props.shareWith
    }
    changePassword(newPassword: string) {
        this.password = newPassword
    }
}

export class FileSharingUrl {
    constructor(private readonly baseHost: string, private readonly fileSharing: FileSharing) {}
    toString() {
        const url = new URL(this.baseHost)
        url.pathname = this.fileSharing.id
        url.username = this.fileSharing.shareWith.email
        return url.toString()
    }
}