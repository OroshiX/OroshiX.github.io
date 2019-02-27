import {Cell} from "./Cell";
import {Area} from "./area";
import {Diff} from "./diff";
import {Sister} from "./sister";
import {Position} from "./position";

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
    private MAX_AREA_SIZE: number = 5;

    constructor(lines: number = 0, columns: number = 0) {
        this.lines = lines;
        this.columns = columns;
        this.cells = [];
        this.diffOnes = [];
        this.sisters = [];
    }

    fillAreaSize(): Array<string> {
        let warnings: Array<string> = [];
        let allAreas = this.getAllAreas();
        allAreas.forEach(area => {
            let areaCells: Set<Cell> = this.getAreaCells(area);
            let size = areaCells.size;
            areaCells.forEach(c => c.area.size = size);
            if (size > this.MAX_AREA_SIZE) {
                warnings.push(
                    "Area with id " + area.id + " is bigger than the max (" + size + " > " + this.MAX_AREA_SIZE + ")");
            }
        });
        return warnings;
    }

    public cellArray(): Array<Cell> {
        let res: Array<Cell> = [];
        for (let row of this.cells) {
            for (let cell of row) {
                res.push(cell);
            }
        }
        return res;
    }

    public getAllAreas(): Set<Area> {
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

    public getAreaPositions(area: Area): Set<Position> {
        return new Set<Position>(this.cellArray().filter(c => c.area.id == area.id).map(cell => cell.position));
    }

    public diffOnesHave(position: Position): boolean {
        for (let diff of this.diffOnes) {
            if (diff.position1 == position || diff.position2 == position) return true;
        }
        return false;
    }

    public sistersHave(position: Position): boolean {
        for (let sis of this.sisters) {
            if (sis.positions.filter(pos => pos.i == position.i && pos.j == position.j).length > 0) return true;
        }
        return false;
    }

    getSisterSymbol(position: Position): string {
        for (let sis of this.sisters) {
            if (sis.positions.filter(pos => pos.i == position.i && pos.j == position.j).length > 0) return sis.symbol;
        }
        return "";
    }
}