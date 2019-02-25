import {Cell} from "./Cell";
import {Area} from "./area";
import {Diff} from "./diff";
import {Sister} from "./sister";

export class Pentatonic {
    id: number = 0;
    version: number = 0;
    areas: string = "";
    difficulty: number = 0;
    author: string = "";
    filename: string = "";
    lines: number;
    columns: number;
    cells: Array<Array<Cell>>;
    diffOnes: Array<Diff>;
    sisters: Array<Sister>;

    constructor(lines: number = 0, columns: number = 0) {
        this.lines = lines;
        this.columns = columns;
        this.cells = [];
        this.diffOnes = [];
    }

    fillAreaSize() {
        let allAreas = this.getAllAreas();
        allAreas.forEach(area => {
            let areaCells: Set<Cell> = this.getAreaCells(area);
            let size = areaCells.size;
            areaCells.forEach(c => c.area.size = size);
        })
    }

    private cellArray(): Array<Cell> {
        return [].concat.apply([], this.cells);
    }

    private getAllAreas(): Set<Area> {
        let set: Set<Area> = new Set();
        let merge: Array<Cell> = this.cellArray();

        merge.forEach((c: Cell) => {
            set.add(c.area)
        });
        return set;
    }

    private getAreaCells(area: Area): Set<Cell> {
        return new Set(this.cellArray().filter(c => c.area.id == area.id));

    }
}