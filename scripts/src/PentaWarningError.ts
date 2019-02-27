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

    public addWarnings(warnings: Array<string>) {
        warnings.forEach(warn => this.addWarning(warn));
    }

    public addError(error: string) {
        this.errors.push(error);
    }

    public hasWarningsOrErrors() {
        return this.warnings.length > 0 || this.errors.length > 0;
    }
}