import { NowGateway } from "./now.gateway";

export class FakeNowGateway implements NowGateway {
    constructor(private readonly now: Date) {}
    nowIs(): Date {
      return this.now
    }
  }