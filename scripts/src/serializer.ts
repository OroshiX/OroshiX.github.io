import {PentaWarningError} from "./PentaWarningError";
import {Area} from "./area";
import {Cell} from "./Cell";
import {Position} from "./position";
import {Diff} from "./diff";
import {Sister} from "./sister";

export class Serializer {
    private static minLines: number = 2;

    static serialize(textContent: string): PentaWarningError {
        let pentaWarningError = new PentaWarningError();
        let penta = pentaWarningError.penta;
        console.log("We want to serialize: " + textContent);
        let lines = textContent.split(/[\r\n]+/);
        if (lines.length < this.minLines) {
            pentaWarningError.addError("Text for penta should contain: \n" +
                "author, nbLine nbCols, penta");
            return pentaWarningError;
        }
        penta.author = lines[0].trim();
        console.log("Author is :" + penta.author);

        let lineCol = lines[1].trim().split(" ").map(s => Number(s));
        console.log("We have lineCol: " + lineCol);
        if (lineCol.length != 2) {
            pentaWarningError.addError(
                "2nd line should provide nb of lines and columns like this \"nbLines nbCols\"");
            return pentaWarningError;
        }
        penta.lines = lineCol[0];
        penta.columns = lineCol[1];
        if (lines.length < this.minLines + penta.lines) {
            pentaWarningError.addError("You didn't provide a pentatonic with " + penta.lines + " lines");
            return pentaWarningError;
        }

        this.fillAreas(pentaWarningError, lines, 2);
        if (pentaWarningError.errors.length > 0) return pentaWarningError;
        this.fillEnonce(pentaWarningError, lines, 2 + penta.lines);

        return pentaWarningError;
    }

    static fillAreas(penta: PentaWarningError, lines: Array<string>, startLine: number) {
        let mapAreas: { [key: string]: Area } = {};
        let line: string;
        for (let index = startLine; index < startLine + penta.penta.lines; index++) {
            let i = index - startLine;
            line = lines[index].trim();
            if (line == "" || line == null) {
                continue;
            }
            let lineCells = [];
            if(line.length != penta.penta.columns) {
                penta.addError(
                    "Mismatch between number of columns (" + penta.penta.columns +
                    ") and the size of the line\"" + line + "\" (cf. line number " + (index + 1) + ")");
                break;
            }

            for (let j = 0; j < penta.penta.columns; j++) {
                let cell = new Cell(i, j);
                let area = mapAreas[line[j]];
                if (area == null) {
                    area = new Area(line[j]);
                    mapAreas[line[j]] = area;
                }
                cell.area = area;
                lineCells.push(cell);
            }
            penta.penta.cells.push(lineCells);
        }
        let warnings = penta.penta.fillAreaSize();
        penta.addWarnings(warnings);
    }

    static fillEnonce(penta: PentaWarningError, lines: Array<string>, startLine: number) {
        let line: string;
        let countArray: number = lines.length;
        let toSister: { [c: string]: Array<Position> } = {};
        for (let i = startLine; i < countArray; i++) {
            line = lines[i].trim();
            if (line == "") continue;

            // we got a number or a constraint
            if (line.startsWith("-")) {
                // DiffOne
                let lineCols = line.substr(1).split(",").map(n => +n);
                if (lineCols.length != 4) {
                    penta.addError("For a diffOne, you should have 4 numbers: \"-i1,j1,i2,j2\" for example. But you typed \"" + line + "\"");
                    break;
                }
                let pos1 = new Position(lineCols[0], lineCols[1]);
                let pos2 = new Position(lineCols[2], lineCols[3]);
                if (pos1 == pos2) {
                    penta.addError("Difference one should concern 2 different positions. But you typed \"" + line + "\"");
                    continue;
                }
                if (!pos1.isNear(pos2)) {
                    penta.addWarning("Difference one should concert 2 near positions. But you typed \"" + line + "\"");
                }
                penta.penta.diffOnes.push(new Diff(pos1, pos2));
                continue;
            }
            // we got a
            let split = line.split(",");
            if (split.length != 3) {
                penta.addError("Bad input, should be n,i,j, but was " + line);
                continue;
            }
            if (split[0].length != 1) {
                penta.addError("Bad input: " + split[0] + " in line " + line);
                continue;
            }
            let nb = split[0];
            let nLine = +split[1];
            let nCol = +split[2];
            if (nLine >= penta.penta.lines) {
                penta.addError(
                    "Line i = " + nLine + " is out of bounds in \"" + line + "\": number of lines = " + penta.penta.lines + " (cf. line " + (i + 1) + ")");
                continue;
            }
            if (nCol >= penta.penta.columns) {
                penta.addError(
                    "Column j = " + nCol + " is out of bounds in \"" + line + "\": number of columns = " + penta.penta.columns + " (cf. line " + (i + 1) + ")");
                continue;
            }
            let cell = penta.penta.cells[nLine][nCol];
            let n: number = +nb;
            if (!Number.isNaN(n)) {
                console.log("nb is " + nb);
                let n: number = +nb;
                console.log("Success converting nb to number: " + n);
                cell.values.push(nb);
            } else {
                if (toSister[nb] == null) {
                    toSister[nb] = [new Position(nLine, nCol)];
                } else {
                    toSister[nb].push(new Position(nLine, nCol));
                }
            }
        }
        for (let keyChar in toSister) {
            penta.penta.sisters.push(new Sister(keyChar, keyChar, toSister[keyChar]));
        }
    }

}