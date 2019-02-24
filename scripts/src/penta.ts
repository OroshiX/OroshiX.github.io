import {Value} from "./value";
import {Sister} from "./sister";
import {Diff} from "./diff";

export class Penta {
    author: String;
    values: Array<Value>;
    height: number;
    width: number;
    difficulty: number;
    name: String;
    data: Array<Array<String>>;
    differences: Array<Diff>;
    sisters: Array<Sister>;

    constructor(author: String, values: Array<Value>, height: number, width: number, difficulty: number, name: String,
                data: Array<Array<String>>, differences: Array<Diff>, sisters: Array<Sister>) {
        this.height = height;
        this.author = author;
        this.values = values;
        this.width = width;
        this.difficulty = difficulty;
        this.name = name;
        this.data = data;
        this.differences = differences;
        this.sisters = sisters;
    }
}

