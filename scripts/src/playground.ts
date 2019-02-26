import {Styles} from "./Styles";
import {PentaWarningError} from "./PentaWarningError";
import {Pentatonic} from "./Pentatonic";
import {RelativePosition} from "./relativePosition";

export class Playground {
    private canvasElement: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    private styles: Styles;

    private cellSize: number;
    private offsetX = 30;
    private offsetY = 30;
    private totalWidth: number;

    constructor(canvasElement: HTMLCanvasElement, context: CanvasRenderingContext2D, styles: Styles) {
        this.canvasElement = canvasElement;
        this.totalWidth = this.canvasElement.width;

        this.context = context;
        this.styles = styles;

        this.canvasElement.style.border = this.styles.borderWidth + "px solid " + this.styles.borderColor;
        this.canvasElement.style.margin = "auto 25px";
        this.canvasElement.style.background = this.styles.background;

    }

    setGroundStyles(): void {
        console.log("Width is " + this.totalWidth);
        // this.canvasElement.setAttribute("width", "500");
        // this.canvasElement.setAttribute("height", "500");
        this.canvasElement.style.border = this.styles.borderWidth + "px solid " + this.styles.borderColor;
        this.canvasElement.style.margin = "auto 25px";
        this.canvasElement.style.background = this.styles.background;
    }

    drawCenterSpot(xAxis: number, yAxis: number, radius: number) {
        this.context.beginPath();
        this.context.arc(xAxis, yAxis, radius, 0, 2 * Math.PI);
        this.context.fillStyle = this.styles.fillColor;
        this.context.fill();
        this.context.lineWidth = this.styles.lineWidth;
        this.context.strokeStyle = this.styles.borderColor;
        this.context.stroke();
    }

    drawCorner(xAxis: number, yAxis: number) {
        this.context.beginPath();
        this.context.arc(xAxis, yAxis, 10, 0, 2 * Math.PI);
        this.context.fillStyle = this.styles.fillColor;
        this.context.fill();
        this.context.lineWidth = this.styles.lineWidth;
        this.context.strokeStyle = this.styles.borderColor;
        this.context.stroke();
    }

    writeText(text: string, xAxis: number, yAxis: number, font: string = this.styles.font.Heading,
              color: string = this.styles.textColor) {
        this.context.font = font;
        this.context.fillStyle = color;
        this.context.fillText(text, xAxis, yAxis);

    }

    drawLine(x1: number, y1: number, x2: number, y2: number) {
        this.context.beginPath();
        this.context.lineWidth = this.styles.borderWidth;
        this.context.fillStyle = this.styles.borderColor;
        this.context.strokeStyle = this.styles.borderColor;
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.stroke();
        this.context.fill();
    }

    drawDiffLine(x1: number,y1: number, x2: number, y2: number) {
        this.context.beginPath();
        this.context.lineWidth = this.styles.diffWidth;
        this.context.fillStyle = this.styles.diffColor;
        this.context.strokeStyle = this.styles.diffColor;
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.stroke();
        this.context.fill();
    }


    drawArrowLine(x1: number, y1: number, x2: number, y2: number, isReverseArrow = false) {
        let i;
        this.context.beginPath();
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.strokeStyle = this.styles.fillColor;
        this.context.lineWidth = this.styles.lineWidth;
        this.context.stroke();

        let x2ofLine = x2;
        let y2OfLine = y2;

        if (!isReverseArrow) {
            for (i = 0; i <= 2; i++) {
                x1 = x2ofLine;
                y1 = ((i == 0) || (i == 2)) ? (y2OfLine - 4) : (y2OfLine + 4);
                x2 = (i == 2) ? (x2ofLine) : (x2ofLine + 4);
                y2 = (i == 2) ? (y2OfLine + 4) : y2OfLine;

                this.context.beginPath();
                this.context.moveTo(x1, y1);
                this.context.lineTo(x2, y2);
                this.context.lineWidth = this.styles.lineWidth;
                this.context.strokeStyle = this.styles.fillColor;
                this.context.stroke();
            }
        }
        else {
            for (i = 0; i <= 2; i++) {
                x1 = x2ofLine;
                y1 = ((i == 0) || (i == 2)) ? (y2OfLine + 4) : (y2OfLine - 4);
                x2 = (i == 2) ? (x2ofLine) : (x2ofLine - 4);
                y2 = (i == 2) ? (y2OfLine - 4) : y2OfLine;

                this.context.beginPath();
                this.context.moveTo(x1, y1);
                this.context.lineTo(x2, y2);
                this.context.lineWidth = 2;
                this.context.strokeStyle = this.styles.fillColor;
                this.context.stroke();
            }
        }

    }

    //Rectangular Area
    drawRectangleThinLine(xAxis: number, yAxis: number, width: number, height: number) {
        this.context.beginPath();
        this.context.fillStyle = this.styles.fillColor;
        this.context.fill();
        this.context.fillRect(xAxis, yAxis, width, height);
        this.context.lineWidth = this.styles.lineWidth;
        this.context.strokeStyle = this.styles.lineColor;
        this.context.strokeRect(xAxis, yAxis, width, height);
    }

    drawRectangleBorderLine(xAxis: number, yAxis: number, width: number, height: number) {
        this.context.beginPath();
        this.context.fillStyle = this.styles.fillColor;
        this.context.fill();
        this.context.fillRect(xAxis, yAxis, width, height);
        this.context.lineWidth = this.styles.borderWidth;
        this.context.strokeStyle = this.styles.borderColor;
        this.context.strokeRect(xAxis, yAxis, width, height);
    }

    drawPentatonic(pentaWarningError: PentaWarningError, errors: Node, warnings: Node, success: Node) {
        console.log("trying to draw: ", pentaWarningError);
        console.log("errors: " + pentaWarningError.errors);
        console.log("Warnings: " + pentaWarningError.warnings);
        errors.textContent = pentaWarningError.errors.join("<br>");
        warnings.textContent = pentaWarningError.warnings.join("<br>");
        if (pentaWarningError.errors.length == 0 && pentaWarningError.warnings.length == 0) {
            success.textContent = "Success!";
        } else {
            success.textContent = "";
        }
        let pentatonic = pentaWarningError.penta;
        this.cellSize = (this.totalWidth - 2 * this.offsetX) / pentatonic.columns;
        let heightCanvas = this.totalWidth * pentatonic.lines / pentatonic.columns;
        this.canvasElement.setAttribute("height", heightCanvas.toString());

        this.drawEachCell(pentatonic);
        // TODO draw penta
        this.drawVerticalSeparations(pentatonic);
        this.drawHorizontalSeparations(pentatonic);
        this.drawAllClues(pentatonic);
    }

    private drawEachCell(pentatonic: Pentatonic) {
        this.drawRectangleBorderLine(this.offsetX, this.offsetY, pentatonic.columns * this.cellSize, pentatonic.lines * this.cellSize);
        for (let i = 0; i < pentatonic.lines; i++) {
            for (let j = 0; j < pentatonic.columns; j++) {
                this.drawRectangleThinLine(this.offsetX + j * this.cellSize, this.offsetY + i * this.cellSize, this.cellSize, this.cellSize);
            }
        }
    }

    private drawVerticalSeparations(pentatonic: Pentatonic) {
        for (let i = 0; i < pentatonic.lines; i++) {
            for (let j = 1; j < pentatonic.columns; j++) {
                if (pentatonic.cells[i][j].area.id != pentatonic.cells[i][j - 1].area.id) {
                    console.log("(" + i + "," + (j - 1) + ") et (" + i + "," + j + ") ne sont PAS dans la meme zone ");
                    this.drawLine(this.offsetX + j * this.cellSize,
                        this.offsetY + i * this.cellSize,
                        this.offsetX + j * this.cellSize,
                        this.offsetY + (i + 1) * this.cellSize);
                }else {
                    console.log("(" + i + "," + (j - 1) + ") et (" + i + "," + j + ") SONT dans la meme zone ");
                }
            }

        }
    }

    private drawHorizontalSeparations(pentatonic: Pentatonic) {
        for (let j = 0; j < pentatonic.columns; j++) {
            for (let i = 1; i < pentatonic.lines; i++) {
                if (pentatonic.cells[i][j].area.id != pentatonic.cells[i - 1][j].area.id) {
                    this.drawLine(this.offsetX + j * this.cellSize,
                        this.offsetY + i * this.cellSize,
                        this.offsetX + (j + 1) * this.cellSize,
                        this.offsetY + i * this.cellSize);
                }
            }
        }
    }

    private drawAllClues(pentatonic: Pentatonic) {
        pentatonic.cellArray().filter(cell => cell.values.length == 1 || pentatonic.sistersHave(cell.position))
            .forEach(c => {
                if (c.values.length == 1) {
                    this.writeText(c.values[0], this.offsetX + c.position.j * this.cellSize + this.cellSize / 3,
                        this.offsetY + c.position.i * this.cellSize + this.cellSize * 3 / 5);
                }
                if (pentatonic.sistersHave(c.position)) {
                    this.writeText(pentatonic.getSisterSymbol(c.position),
                        this.offsetX + c.position.j * this.cellSize + 0.2 * this.cellSize,
                        this.offsetY + c.position.i * this.cellSize + 0.2 * this.cellSize, this.styles.font.Default);
                }
            });
        this.drawDiffOnes(pentatonic);

    }

    private drawDiffOnes(pentatonic: Pentatonic) {
        let xArray: number[] = [];
        let yArray: number[] = [];
        pentatonic.diffOnes.forEach(diffOne => {
            for (let k = 0; k < 5; k++) {
                xArray.push(this.offsetX + diffOne.position1.j * this.cellSize + (this.cellSize * k) / 4);
                yArray.push(this.offsetY + diffOne.position1.i * this.cellSize + (this.cellSize * k) / 4);
            }
            let xStart, xEnd, yStart, yEnd: number;
            switch (diffOne.position1.getPositionRelativeToMe(diffOne.position2)) {
                case RelativePosition.TOP:
                    xStart = xArray[2];
                    xEnd = xArray[2];
                    yStart = 2 * yArray[0] - yArray[1];
                    yEnd = yArray[1];
                    break;
                case RelativePosition.RIGHT:
                    xStart = 2 * xArray[4] - xArray[3];
                    xEnd = xArray[3];
                    yStart = yArray[2];
                    yEnd = yArray[2];
                    break;
                case RelativePosition.BOTTOM:
                    xStart = xArray[2];
                    xEnd = xArray[2];
                    yStart = 2 * yArray[4] - yArray[3];
                    yEnd = yArray[3];
                    break;
                case  RelativePosition.LEFT:
                    xStart = 2 * xArray[0] - xArray[1];
                    xEnd = xArray[1];
                    yStart = yArray[2];
                    yEnd = yArray[2];
                    break;
                case RelativePosition.TOP_RIGHT:
                    xStart = 2 * xArray[4] - xArray[3];
                    xEnd = xArray[3];
                    yStart = 2 * yArray[0] - yArray[1];
                    yEnd = yArray[1];
                    break;
                case RelativePosition.BOTTOM_RIGHT:
                    xStart = 2 * xArray[4] - xArray[3];
                    xEnd = xArray[3];
                    yStart = 2 * yArray[4] - yArray[3];
                    yEnd = yArray[3];
                    break;
                case RelativePosition.BOTTOM_LEFT:
                    xStart = 2 * xArray[0] - xArray[1];
                    xEnd = xArray[1];
                    yStart = 2 * yArray[4] - yArray[3];
                    yEnd = yArray[3];
                    break;
                case RelativePosition.TOP_LEFT:
                    xStart = 2 * xArray[0] - xArray[1];
                    xEnd = xArray[1];
                    yStart = 2 * yArray[0] - yArray[1];
                    yEnd = yArray[1];
                    break;
                case RelativePosition.ILLEGAL:
                    console.log("Illegal position");
                    return;
            }
            this.drawDiffLine(xStart, yStart, xEnd, yEnd);
        })
    }
}
