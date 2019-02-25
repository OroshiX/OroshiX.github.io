import {Playground} from "./playground";
import {Styles} from "./Styles";
import {PentaWarningError} from "./PentaWarningError";
import {Serializer} from "./serializer";

let _height = 500;
let _width = 1000;
let canvas = {
    width: _width,
    height: _height,
    halfWidth: _width / 2,
    lineWidth: 2,
    background: {Default: "#08a107", Orange: "#f60", Green: "#f80"},
    borderColor: {White: "#fff", Green: "#f80"},
    colorMap: {Orange: "#f60", Green: "#f80"}
};
let common = {
    fillColor: {Default: "#0d5f0c", Green: "green", Red: "red", Orange: "#f60", White: "#fff"},
    borderColor: "#fff",
    fontFamily: " 'Segoe UI',Arial,sans-serif",
    font: {Default: "12px 'Segoe UI',Arial,sans-serif", Heading: "14px 'Segoe UI',Arial,sans-serif"},
    lineWidth: {Pixel1: 1, Pixel2: 2, Pixel3: 3, Pixel4: 4, Pixel5: 5},
    arrowLength: {Default: 70, Pixel50: 50}
};

let penaltyArea = {
    height: Math.ceil((canvas.height * 70) / 100),
    width: Math.ceil((canvas.width * 12) / 100),
    yPosition: Math.ceil(((canvas.height * 30) / 100) / 2),
    xPosition: {TeamA: 0, TeamB: canvas.width - Math.ceil((canvas.width * 12) / 100)}
};
let goalArea = {
    height: Math.ceil((penaltyArea.height * 60) / 100),
    width: Math.ceil(penaltyArea.width / 2),
    yPositon: (canvas.height - penaltyArea.height),
    xPosition: {TeamA: 0, TeamB: Math.ceil(canvas.width - (penaltyArea.width / 2))}
};
let penaltyArc = {
    xPosition: {
        TeamA: penaltyArea.width - goalArea.width / 4,
        TeamB: canvas.width - penaltyArea.width + goalArea.width / 4
    },
    yPosition: canvas.height / 2,
    radius: goalArea.height / 3
};

let groundCorner = {
    radius: Math.ceil((canvas.height * 2) / 100)
};
let captionText = "";

window.onload = function () {
    let textEditPenta = document.getElementById("text-penta") as HTMLTextAreaElement;
    let buttonConvert = document.getElementById("btn-convert") as HTMLButtonElement;
    let errors: Node = document.getElementById("errors");
    let warnings: Node = document.getElementById("warnings");
    let success: Node = document.getElementById("success");
    let canvasElement = document.getElementById("penta-representation") as HTMLCanvasElement;
    let context2D: CanvasRenderingContext2D = canvasElement.getContext("2d");

    let ground = new Playground(canvasElement, context2D, new Styles(20, 20));
    buttonConvert.onclick = () => {
        let penta: PentaWarningError = Serializer.serialize(textEditPenta.value);
        ground.drawPentatonic(penta, errors, warnings, success);
    };
};