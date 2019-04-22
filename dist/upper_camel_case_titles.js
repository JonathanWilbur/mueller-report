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
var titleize = require("titleize");
var inReport = fs.readFileSync("./dist/volume1.md", { encoding: "utf8" });
var lines = inReport.split(/\r?\n/g);
for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    if (line.indexOf("#") === 0) {
        lines[i] = titleize(line);
    }
}
var outReport = lines.join("\r\n");
fs.writeFileSync("./dist/volume1-camelcasedtitle.md", outReport);
console.log("Done!");
