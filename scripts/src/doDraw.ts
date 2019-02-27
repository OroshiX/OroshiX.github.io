import {Playground} from "./playground";
import {Styles} from "./Styles";
import {PentaWarningError} from "./PentaWarningError";
import {Serializer} from "./serializer";
import {PentaChecker} from "./PentaChecker";
import {PentaJson} from "./pentaJson";
window.onload = function () {
    let textEditPenta = document.getElementById("text-penta") as HTMLTextAreaElement;
    let buttonVisualise = document.getElementById("btn-visualise") as HTMLButtonElement;
    let buttonConvert = document.getElementById("btn-convert") as HTMLButtonElement;

    let inputDifficulty = document.getElementById("difficulty-input") as HTMLInputElement;
    let inputTitle = document.getElementById("title-input") as HTMLInputElement;
    let errors: Node = document.getElementById("errors");
    let warnings: Node = document.getElementById("warnings");
    let success: Node = document.getElementById("success");
    let canvasElement = document.getElementById("penta-representation") as HTMLCanvasElement;
    let context2D: CanvasRenderingContext2D = canvasElement.getContext("2d");

    function visualise(): PentaWarningError {
        let penta: PentaWarningError = Serializer.serialize(textEditPenta.value);
        penta.penta.difficulty = +inputDifficulty.value;
        penta.penta.filename = inputTitle.value;
        PentaChecker.check(penta);
        ground.drawPentatonic(penta, errors, warnings, success);
        return penta;
    }

    function download(filename: string, text: string) {
        let element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }
    let ground = new Playground(canvasElement, context2D, new Styles(20, 20));
    buttonVisualise.onclick = visualise;
    buttonConvert.onclick = () => {
        let penta = visualise();
        if (penta.hasWarningsOrErrors()) {
            alert("Please fix any errors and warnings before converting to JSON");
            return;
        }
        let pentaJson = PentaJson.fromPentatonic(penta.penta);
        let jsonString = JSON.stringify(pentaJson);
        download(pentaJson.name + ".json", jsonString);
    }

};