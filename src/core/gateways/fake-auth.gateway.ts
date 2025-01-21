import { AuthenticatedUser } from "../models/authenticated-user.model";
import { AuthGateway } from "./auth.gateway";

export class FakeAuthGateway implements AuthGateway {
  constructor(public readonly authenticatedUserName: string) {}
  current(): Promise<AuthenticatedUser> {
    return Promise.resolve(new AuthenticatedUser(this.authenticatedUserName))
  }
}