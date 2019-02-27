import {Playground} from "./playground";
import {Styles} from "./Styles";
import {PentaWarningError} from "./PentaWarningError";
import {Serializer} from "./serializer";
import {PentaChecker} from "./PentaChecker";

let _height = 500;
let _width = 1000;
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
        PentaChecker.check(penta);
        ground.drawPentatonic(penta, errors, warnings, success);
    };
};