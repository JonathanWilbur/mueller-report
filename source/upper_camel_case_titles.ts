import * as fs from "fs";
const titleize = require("titleize");

let inReport : string = fs.readFileSync("./dist/volume1.md", { encoding: "utf8" });
const lines : string[] = inReport.split(/\r?\n/g);
for (let i : number = 0; i < lines.length; i++) {
    const line : string = lines[i];
    if (line.indexOf("#") === 0) {
        lines[i] = titleize(line);
    }
}
const outReport : string = lines.join("\r\n");
fs.writeFileSync("./dist/volume1-camelcasedtitle.md", outReport);
console.log("Done!");