export class Folder {
  constructor(private readonly params: {parentId: string, name: string, id: string}) {}

  get parentId() {
    return this.params.parentId
  }

  get name() {
    return this.params.name
  }

  get id() {
    return this.params.id
  }
}