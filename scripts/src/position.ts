export class Position {

    i: number;
    j: number;

    constructor(i: number, j: number) {
        this.i = i;
        this.j = j;
    }

    isNear(pos: Position): boolean {
        if (Math.abs(pos.i - this.i) > 1 || Math.abs(pos.j - this.j) > 1) {
            return false;
        }
        if (pos.i == this.i && pos.j == this.j) {
            return false;
        }
        return true;
    }
}