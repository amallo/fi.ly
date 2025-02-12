export class AuthenticatedUser {
  constructor(private readonly  props: {readonly id: string, readonly name: string,  readonly avatar: string}) {}
  get id() {
    return this.props.id
  }
  get name() {
    return this.props.name
  }
  get avatar() {
    return this.props.avatar
  }
}