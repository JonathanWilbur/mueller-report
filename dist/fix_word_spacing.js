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
var inReport = fs.readFileSync("./dist/mueller_report.md", { encoding: "utf8" });
var wordsList = fs.readFileSync("./data/words_list.txt", { encoding: "utf8" })
    .split(/\r?\n/g)
    .filter(function (word) { return (word.length > 6); });
console.log("Fixing " + wordsList.length + " words.");
wordsList.forEach(function (word) {
    var reString = "\\b" + word.split("").join(" *") + "\\b";
    console.log("Replacing regex '" + reString + "' with " + word + ".");
    var regex = new RegExp(reString, "gi");
    inReport = inReport.replace(regex, word);
});
fs.writeFileSync("./data/mueller_report2.md", inReport);
console.log("Done!");
