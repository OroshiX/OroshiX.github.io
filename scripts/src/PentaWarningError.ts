import {Pentatonic} from "./Pentatonic";

export class PentaWarningError {
    penta: Pentatonic;
    warnings: Array<string>;
    errors: Array<string>;

    constructor() {
        this.penta = new Pentatonic();
        this.warnings = [];
        this.errors = [];
    }

    public addWarning(warn: string) {
        this.warnings.push(warn);
    }

    public addError(error: string) {
        this.errors.push(error);
    }

}