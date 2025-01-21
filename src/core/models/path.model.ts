export class Path {
  static readonly ROOT_DIR = "root"

  static root() {
    return new Path()
  }

  static fromName(name:string) {
    return Path.root().withFolder(name)
  }

  private folders: string[] = [Path.ROOT_DIR]
  
  public path() {
    return this.folders.join("/")
  }

  withFolder(name:string) {
    this.folders.push(name)
    return this
  }
}