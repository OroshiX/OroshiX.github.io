export class Playground {
    private canvasElement: HTMLCanvasElement;
    private context: any;
    private canvas: any;
    private common: any;
    private groundCorner: any;

    constructor(canvasElement: HTMLCanvasElement, context: any, canvas: any, common: any, groundCorner: any) {
        this.canvasElement = canvasElement;
        this.context = context;
        this.canvas = canvas;
        this.common = common;
        this.groundCorner = groundCorner;
    }

    setGroundStyles(): void {
        this.canvasElement.setAttribute("width", this.canvas.width.toString());
        this.canvasElement.setAttribute("height", this.canvas.height.toString());
        this.canvasElement.style.border = "2px solid " + this.canvas.borderColor.White;
        this.canvasElement.style.margin = "auto 25px";
        this.canvasElement.style.background = this.canvas.background.Default;
    }

    drawCenterSpot(xAxis: number, yAxis: number, radius: number) {
        this.context.beginPath();
        this.context.arc(xAxis, yAxis, radius, 0, 2 * Math.PI);
        this.context.fillStyle = this.common.fillColor.Default;
        this.context.fill();
        this.context.lineWidth = this.common.lineWidth.Pixel2;
        this.context.strokeStyle = this.common.borderColor;
        this.context.stroke();
    }

    drawCorner(xAxis: number, yAxis: number) {
        this.context.beginPath();
        this.context.arc(xAxis, yAxis, this.groundCorner.radius, 0, 2 * Math.PI);
        this.context.fillStyle = this.common.fillColor.Default;
        this.context.fill();
        this.context.lineWidth = this.common.lineWidth.Pixel2;
        this.context.strokeStyle = this.common.borderColor;
        this.context.stroke();
    }

    writeText(text: string, xAxis: number, yAxis: number, font: string = this.common.font.Default,
              color: string = this.common.fillColor.White) {
        this.context.font = font;
        this.context.fillStyle = color;
        this.context.fillText(text, xAxis, yAxis);

    }

    drawLine(x1: number, y1: number, x2: number, y2: number) {
        this.context.beginPath();
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.stroke();
        this.context.lineWidth = this.common.lineWidth;
        this.context.fillStyle = this.common.fillColor.White;
        this.context.fill();
    }

    drawArrowLine(x1: number, y1: number, x2: number, y2: number, isReverseArrow = false) {
        let i;
        this.context.beginPath();
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.strokeStyle = this.common.fillColor.Orange;
        this.context.lineWidth = this.common.lineWidth.Pixel1;
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
                this.context.lineWidth = this.common.lineWidth.Pixel2;
                this.context.strokeStyle = this.common.fillColor.Orange;
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
                this.context.strokeStyle = this.common.fillColor.Orange;
                this.context.stroke();
            }
        }

    }
}
