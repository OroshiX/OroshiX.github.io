import {Position} from "./position";

export class Sister {
    id: string;
    symbol: String;
    positions: Array<Position>;

    constructor(id: string, symbol: String, positions: Array<Position>) {
        this.id = id;
        this.symbol = symbol;
        this.positions = positions;
    }
}