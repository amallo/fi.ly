export class FileSharing {
    constructor(
        public readonly id: string,
        public readonly fileId: string,
        public readonly at: Date, 
        public readonly by: string, 
        public readonly expiresAt: Date,
        public password: string,
        public readonly link: URL) {}
    changePassword(newPassword: string) {
        this.password = newPassword
    }
}