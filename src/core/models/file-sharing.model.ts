export class FileSharing {
    constructor(
        public readonly id: string,
        public readonly fileId: string,
        public readonly at: Date, 
        public readonly by: string, 
        public readonly expiresAt: Date,
        public password: string,
        public readonly link: FileSharingUrl) {}
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