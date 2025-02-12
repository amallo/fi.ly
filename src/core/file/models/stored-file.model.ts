
export class StoredFile {
    constructor(public id: string, public name: string, public type: string, public createdAt: Date, public readonly folderId: string, public readonly by: string) {}
}