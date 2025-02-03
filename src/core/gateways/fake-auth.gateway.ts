import { AuthenticatedUser } from "../models/authenticated-user.model";
import { AuthGateway } from "./auth.gateway";

export class FakeAuthGateway implements AuthGateway {
  constructor(public readonly authenticatedUser: AuthenticatedUser) {}
  current(): Promise<AuthenticatedUser> {
    return Promise.resolve(this.authenticatedUser)
  }
}