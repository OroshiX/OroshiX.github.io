export class Styles {
    widthCell: number;
    heightCell: number;
    background: string;
    borderColor: string;
    lineColor: string;
    lineWidth: number;
    borderWidth: number;
    fillColor: string;
    textColor: string;
    font: { Default: string, Heading: string };
    diffColor: string;
    diffWidth: number;

    constructor(width: number, height: number) {
        this.widthCell = width;
        this.heightCell = height;
        this.background = "#9a2424";
        this.borderColor = "#343653";
        this.lineWidth = 2;
        this.borderWidth = 10;
        this.diffWidth = 5;
        this.fillColor = "#fff0e6";
        this.textColor = "#d62061";
        this.lineColor = "#6dc2ff";
        this.diffColor = "#ff2955";
        this.font = {Default: "12px 'Segoe UI',Arial,sans-serif", Heading: "34px 'Segoe UI',Arial,sans-serif"};
    }

}