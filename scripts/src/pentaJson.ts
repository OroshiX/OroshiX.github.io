import {Value} from "./value";
import {Sister} from "./sister";
import {Diff} from "./diff";
import {Pentatonic} from "./Pentatonic";

export class PentaJson {
    author: String;
    values: Array<Value>;
    height: number;
    width: number;
    difficulty: number;
    name: String;
    data: Array<Array<String>>;
    differences: Array<Diff>;
    sisters: Array<Sister>;

    constructor() {
        // this.height = height;
        // this.author = author;
        this.values = [];
        // this.width = width;
        // this.difficulty = difficulty;
        // this.name = name;
        this.data = [];
        this.differences = [];
        this.sisters = [];
    }

    static fromPentatonic(penta: Pentatonic): PentaJson {
        let res = new PentaJson();
        res.author = penta.author;
        res.difficulty = penta.difficulty;
        res.name = penta.filename;
        res.width = penta.columns;
        res.height = penta.lines;
        res.differences = penta.diffOnes;
        res.sisters = penta.sisters;

        res.data = penta.cells.map(row => row.map(cell => cell.area.id));
        res.values = penta.cellArray()
            .filter(cell => cell.values.length == 1)
            .map(cell => new Value(+cell.values[0], cell.position.i, cell.position.j));

        return res;
    }
}

