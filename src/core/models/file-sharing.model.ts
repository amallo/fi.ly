export class FileSharing {
    private readonly id: string
    private readonly fileId: string
    private readonly at: Date
    private readonly by: string
    private readonly expiresAt: Date
    private password: string
    private readonly link: FileSharingUrl
    constructor(props : {id: string, fileId: string, at: Date, by: string, expiresAt: Date, password: string, link: FileSharingUrl}) {
        this.id = props.id
        this.fileId = props.fileId
        this.at = props.at
        this.by = props.by
        this.expiresAt = props.expiresAt
        this.password = props.password
        this.link = props.link
    }
    changePassword(newPassword: string) {
        this.password = newPassword
    }
}

export class FileSharingUrl {
    private readonly _url: URL
    constructor(public readonly host: URL, shareId: string) {
        this._url = new URL(this.host)
        this._url.pathname = shareId
    }
    url() {
        return this._url
    }
}