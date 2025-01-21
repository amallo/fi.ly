import { AuthenticatedUser } from "core/models/authenticated-user.model";
import { AuthGateway, NotLoggedInError } from "./auth.gateway";


export class NotLoggedInAuthGateway implements AuthGateway {
    current(): Promise<AuthenticatedUser> {
        throw new NotLoggedInError()
    }
}