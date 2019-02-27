import {PentaWarningError} from "./PentaWarningError";
import {Position} from "./position";
import {Area} from "./area";

export class PentaChecker {
    static check(pentaWithWarnings: PentaWarningError) {
        PentaChecker.checkAreas(pentaWithWarnings);
    }

    private static checkAreas(pentaWithWarnings: PentaWarningError) {
        let penta = pentaWithWarnings.penta;
        penta.getAllAreas().forEach((area: Area) => {
            let areaPositions = penta.getAreaPositions(area);
            // To array
            let positionsArray: Array<Position> = [];
            areaPositions.forEach(p => positionsArray.push(p));
            // Check adjacency
            if (!this.checkAdjacent(positionsArray)) {
                pentaWithWarnings.addWarning("Probable error with area id " + area.id + ": it has disjoint areas!");
            }
        })
    }

    private static checkAdjacent(areaPositions: Array<Position>): boolean {
        if (areaPositions.length == 0) return true;
        // We create a set to store the adjacent elements
        let processed: Array<Position> = [];
        // We will add different elements in that set, that will be the values of the variable element
        // The first element we add is the first of the input set
        let element: Position = areaPositions[0];
        // As long as there is a coincident element, we repeat the process
        while (element != null) {
            // We start by adding the element to the processed ones
            processed.push(element);
            // We remove it from the input
            let indexToRemove = areaPositions.indexOf(element, 0);
            if (indexToRemove > -1) {
                areaPositions.splice(indexToRemove, 1);
            }
            // We get a new element to add
            element = this.getFirstAdjacentSets(processed, areaPositions)
        }
        // If the input is empty, it means that every element has been successfully added
        // to the processed ones, thus this input is correct
        return areaPositions.length == 0;
    }

    private static getFirstAdjacent(position: Position, others: Array<Position>): Position {
        for (let p of others) {
            if (position.isAdjacent(p)) return p;
        }
        return null;
    }

    private static getFirstAdjacentSets(pos1: Array<Position>, pos2: Array<Position>): Position {
        for (let p of pos1) {
            let firstAdj = this.getFirstAdjacent(p, pos2);
            if (firstAdj != null) return firstAdj;
        }
        return null;
    }

}