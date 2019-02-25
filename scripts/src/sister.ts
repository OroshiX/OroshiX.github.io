import {Position} from "./position";

export class Sister {
    id: string;
    symbol: string;
    positions: Array<Position>;

    constructor(id: string, symbol: string, positions: Array<Position>) {
        this.id = id;
        this.symbol = symbol;
        this.positions = positions;
    }
}