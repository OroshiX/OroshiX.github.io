import {RelativePosition} from "./relativePosition";

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

    isAdjacent(pos: Position): boolean {
        return Math.abs(pos.i - this.i) + Math.abs(pos.j - this.j) == 1;
    }

    getPositionRelativeToMe(position: Position): RelativePosition {
        if (!position.isNear(this)) {
            return RelativePosition.ILLEGAL;
        }
        /**
         * bottom == 1 => bottom
         * bottom == 0 => middle
         * bottom == -1 => top
         */
        let bottom = position.i - this.i;
        /**
         * right == 1 => right
         * right == 0 => middle
         * right == -1 => left
         */
        let right = position.j - this.j;
        if (Math.abs(bottom) > 1 || Math.abs(right) > 1) return RelativePosition.ILLEGAL;

        if (bottom < 0 && right < 0) return RelativePosition.TOP_LEFT;
        if (bottom < 0 && right == 0) return RelativePosition.TOP;
        if (bottom < 0 && right > 0) return RelativePosition.TOP_RIGHT;

        if (bottom == 0 && right < 0) return RelativePosition.LEFT;
        if (bottom == 0 && right > 0) return RelativePosition.RIGHT;

        if (bottom > 0 && right < 0) return RelativePosition.BOTTOM_LEFT;
        if (bottom > 0 && right == 0) return RelativePosition.BOTTOM;
        if (bottom > 0 && right > 0) return RelativePosition.BOTTOM_RIGHT;
        return RelativePosition.ILLEGAL;
    }

}

