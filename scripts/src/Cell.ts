import {Area} from "./area";
import {Position} from "./position";

export class Cell {
    position: Position;
    area: Area;
    values: Array<string>;

    constructor(i: number, j: number) {
        this.position = new Position(i, j);
        this.values = [];
    }
}