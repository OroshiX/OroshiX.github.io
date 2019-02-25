import {Position} from "./position";

export class Diff {
    position1: Position;
    position2: Position;

    constructor(pos1: Position, pos2: Position) {
        this.position1 = pos1;
        this.position2 = pos2;
    }
}