import { AuthenticatedUser } from "../models/authenticated-user.model";


/**
 * Error thrown when the user is not logged in
 */
export class NotLoggedInError extends Error {
  constructor() {
      super("NOT_LOGGED_IN")
  }
}

/**
 * AuthGateway is a gateway that allows to get the current authenticated user
 */
export interface AuthGateway {
  /**
   * Get the current authenticated user
   * @returns {Promise<AuthenticatedUser>} The current authenticated user
   * @throws {NotLoggedInError} If the user is not logged in
   */
  current(): Promise<AuthenticatedUser>
}