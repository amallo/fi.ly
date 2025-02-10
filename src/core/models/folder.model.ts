export class Folder {
  constructor(private readonly props: {parentId: string, name: string, id: string}) {}

  get parentId() {
    return this.props.parentId
  }

  get name() {
    return this.props.name
  }

  get id() {
    return this.props.id
  }
}