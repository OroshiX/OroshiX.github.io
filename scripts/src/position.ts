export class Position {
    isNear(pos2: Position): any {
        throw new Error("Method not implemented.");
    }
    i: number;
    j: number;

    constructor(i: number, j: number) {
        this.i = i;
        this.j = j;
    }
}