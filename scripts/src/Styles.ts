export class Styles {
    widthCell: number;
    heightCell: number;
    background: string;
    borderColor: string;
    lineWidth: number;
    borderWidth: number;
    fillColor: string;
    textColor: string;
    font: { Default: "12px 'Segoe UI',Arial,sans-serif", Heading: "14px 'Segoe UI',Arial,sans-serif" };

    constructor(width: number, height: number) {
        this.widthCell = width;
        this.heightCell = height;
        this.background = "#fff0e6";
        this.borderColor = "#343653";
        this.lineWidth = 2;
        this.borderWidth = 10;
        this.fillColor = "#9a2424";
        this.textColor = "#00639f";
        this.font = {Default: "12px 'Segoe UI',Arial,sans-serif", Heading: "14px 'Segoe UI',Arial,sans-serif"};
    }

}