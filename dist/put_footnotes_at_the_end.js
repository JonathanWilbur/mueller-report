"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var inReport = fs.readFileSync("./volume1.md", { encoding: "utf8" });
var lines = inReport.split(/\r?\n/g);
var footNotes = [];
for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    if (line.indexOf("[^") === 0) {
        footNotes.push(line);
        lines[i] = "";
    }
}
var outReport = lines.join("\r\n") + footNotes.join("\r\n");
fs.writeFileSync("./dist/volume1.md", outReport);
console.log("Done!");
