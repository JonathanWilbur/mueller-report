import * as fs from "fs";
let inReport : string = fs.readFileSync("./volume1.md", { encoding: "utf8" });
const lines : string[] = inReport.split(/\r?\n/g);
const footNotes : string[] = [];
for (let i : number = 0; i < lines.length; i++) {
    const line : string = lines[i];
    if (line.indexOf("[^") === 0) {
        footNotes.push(line);
        lines[i] = "";
    }
}
const outReport : string = lines.join("\r\n") + footNotes.join("\r\n");
fs.writeFileSync("./dist/volume1.md", outReport);
console.log("Done!");