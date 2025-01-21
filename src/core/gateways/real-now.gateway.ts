import { NowGateway } from "./now.gateway";

export class RealNowGateway implements NowGateway {
    nowIs(): Date {
        return new Date()
    }
}