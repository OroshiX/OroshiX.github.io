import {Styles} from "./Styles";
import {PentaJson} from "./pentaJson";
import {PentaWarningError} from "./PentaWarningError";

export class Playground {
    private canvasElement: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    private styles: Styles;

    constructor(canvasElement: HTMLCanvasElement, context: CanvasRenderingContext2D, styles: Styles) {
        this.canvasElement = canvasElement;

        this.context = context;
        this.styles = styles;
    }

    setGroundStyles(): void {
        let width = this.canvasElement.width;
        console.log("Width is " + width);
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

    writeText(text: string, xAxis: number, yAxis: number, font: string = this.styles.font.Default,
              color: string = this.styles.textColor) {
        this.context.font = font;
        this.context.fillStyle = color;
        this.context.fillText(text, xAxis, yAxis);

    }

    drawLine(x1: number, y1: number, x2: number, y2: number) {
        this.context.beginPath();
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.stroke();
        this.context.lineWidth = this.styles.lineWidth;
        this.context.fillStyle = this.styles.fillColor;
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
    drawRectangle(xAxis: number, yAxis: number, width: number, height: number) {
        this.context.beginPath();
        this.context.fillStyle = this.styles.fillColor;
        this.context.fill();
        this.context.fillRect(xAxis, yAxis, width, height);
        this.context.lineWidth = this.styles.lineWidth;
        this.context.strokeStyle = this.styles.borderColor;
        this.context.strokeRect(xAxis, yAxis, width, height);
    }

    drawPentatonic(pentaWarningError: PentaWarningError) {
        console.log("trying to draw: " + pentaWarningError);
        console.log("errors: " + pentaWarningError.errors);
        console.log("Warnings: " + pentaWarningError.warnings);
        let pentatonic = pentaWarningError.penta;



    }
}
