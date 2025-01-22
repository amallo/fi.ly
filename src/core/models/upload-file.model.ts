import { AuthenticatedUser } from "./authenticated-user.model";

export class UploadFile {
    constructor(public readonly id: string,public readonly owner: AuthenticatedUser, public readonly type: 'video', public readonly originPath: string, public readonly at: Date, public readonly target: string, public readonly title: string) {}
  }