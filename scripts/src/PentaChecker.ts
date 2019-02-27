import {PentaWarningError} from "./PentaWarningError";
import {Position} from "./position";

export class PentaChecker {
    static check(pentaWithWarnings: PentaWarningError) {
        PentaChecker.checkAreas(pentaWithWarnings);
    }

    private static checkAreas(pentaWithWarnings: PentaWarningError) {
        let penta = pentaWithWarnings.penta;
        penta.getAllAreas().forEach(area => {
            let areaPositions = penta.getAreaPositions(area);
            if (!this.checkAdjacent(areaPositions)) {
                pentaWithWarnings.addWarning("Probable error with area id " + area.id + ": it has disjoint areas!");
            }
        })
    }

    private static checkAdjacent(areaPositions: Set<Position>): boolean {
        // TODO algo
        return true;
    }
}