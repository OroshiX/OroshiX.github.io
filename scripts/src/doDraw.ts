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
    let textEditPenta = document.getElementById("text-penta") as HTMLInputElement;
    let buttonConvert = document.getElementById("btn-convert") as HTMLButtonElement;
    buttonConvert.onclick = () => {
        let penta: PentaWarningError = Serializer.serialize(textEditPenta.textContent);
        ground.drawPentatonic(penta);
    };
    let xPos = 0;
    let yPos = 0;

    let canvasElement = document.getElementById("penta-representation") as HTMLCanvasElement;
    let context2D: CanvasRenderingContext2D = canvasElement.getContext("2d");

    let ground = new Playground(canvasElement, context2D, new Styles(20, 20));

    ground.setGroundStyles();
    setTimeout(function () {
        //First draw all corners
        ground.drawCorner(5, 5);//Left Top
        ground.drawCorner(5, canvas.height - 5); //Bottom Left
        ground.drawCorner(canvas.width - 5, 5); //Top Right
        ground.drawCorner(canvas.width - 5, canvas.height - 5); //Bottom Right

        //Now draw ground devider after 500 ms
        setTimeout(function () {
            //Half-way line
            ground.drawLine(canvas.width / 2, 0, canvas.width / 2, canvas.height);
            captionText = "Half-Way Line";
            xPos = (canvas.width / 2) + common.arrowLength.Default;
            yPos = canvas.height / 6;

            //Now draw center spot
            setTimeout(function () {
                ground.drawArrowLine(canvas.halfWidth, yPos, xPos, yPos);
                ground.writeText(captionText, xPos + 10, yPos, common.font.Heading);
                ground.drawCenterSpot(canvas.width / 2, canvas.height / 2, penaltyArc.radius);
                // ground.drawPenaltySpot(canvas.width / 2, canvas.height / 2, 2);

                //Draw Team a Penaly Areas
                setTimeout(function () {
                    //Team-A
                    captionText = "Team - A";
                    xPos = Math.ceil((canvas.width) / 4) - Math.ceil(captionText.length / 2);
                    yPos = 20;
                    ground.writeText(captionText, xPos, yPos, common.font.Heading);
                    // ground.drawPenaltyArc(penaltyArc.xPosition.TeamA, penaltyArc.yPosition, penaltyArc.radius);
                    // ground.drawPenaltyArea(penaltyArea.xPosition.TeamA, penaltyArea.yPosition);
                    // ground.drawGoalArea(goalArea.xPosition.TeamA, goalArea.yPositon);
                    // ground.drawPenaltySpot(goalArea.width / 2, canvas.height / 2, 2);
                    // ground.drawCaptionForTeamA(ground);

                    ////Draw Team a Penaly Areas
                    setTimeout(function () {
                        //Team*B
                        captionText = "Team - B";
                        xPos = canvas.width - canvas.width / 3.5;
                        ground.writeText(captionText, xPos, yPos, common.font.Heading);
                        // ground.drawPenaltyArc(penaltyArc.xPosition.TeamB, penaltyArc.yPosition, penaltyArc.radius);
                        // ground.drawPenaltyArea(penaltyArea.xPosition.TeamB, penaltyArea.yPosition);
                        // ground.drawGoalArea(goalArea.xPosition.TeamB, goalArea.yPositon);
                        // ground.drawPenaltySpot(canvas.width - (goalArea.width / 2), canvas.height / 2, 2);
                        // ground.drawCaptionForTeamB(ground);

                        setTimeout(function () {
                            //Draw Captions for Center Spot
                            ground.drawArrowLine(canvas.halfWidth, canvas.height / 2,
                                canvas.halfWidth + penaltyArc.radius * 2, canvas.height / 2, false);
                            captionText = "Center Spot";
                            xPos = canvas.halfWidth + penaltyArc.radius * 2;
                            yPos = (canvas.height / 2) - 10;
                            ground.writeText(captionText, xPos, yPos, common.font.Heading);
                        }, 500);

                    }, 500);

                }, 1000);

            }, 500);

        }, 500);

    }, 5000);

};