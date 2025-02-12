import { AuthenticatedUser } from "@/core/auth/models/authenticated-user.model";
import { AuthGateway, NotLoggedInError } from "@/core/auth/gateways/auth.gateway";


export class NotLoggedInAuthGateway implements AuthGateway {
    current(): Promise<AuthenticatedUser> {
        throw new NotLoggedInError()
    }
}