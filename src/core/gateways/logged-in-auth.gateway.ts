import { AuthenticatedUser } from "@/core/models/authenticated-user.model";
import { AuthGateway } from "./auth.gateway";

export class LoggedInAuthGateway implements AuthGateway {
    constructor(private user: AuthenticatedUser) {}
    current(): Promise<AuthenticatedUser> {
        return Promise.resolve(this.user)
    }
}