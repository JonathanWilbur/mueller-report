const parse = require("csv-parse");
import * as csv from "csv-parse";
import * as fs from "fs";
const lines : string[] = [];

interface Line {
    page : number,
    line : number,
    text : string
}

const parser : csv.Parser = parse({
    columns: [
        "page",
        "line",
        "text"
    ],
    delimiter: ',',
    cast: (value : string, context : any) : number | string => {
        if (context.index < 2) return parseInt(value);
        else return value;
    },
    trim: false
});

parser.on("readable", () : void => {
    let line : Line;
    while (line = parser.read()) {
        if (isNaN(line.page)) continue;
        if (line.line <= 2) continue; // Skip headers
        if (/^\s*$/.test(line.text)) continue; // Skip blank lines
        if (/^\s{40,}(?:[A-D]\-)?\d+\s*$/.test(line.text)) continue; // Skip page-number lines
        lines.push(line.text);
    }
    parser.end();
});

parser.on("end", () : void => {
    let dirtyReport : string = lines.join("\r\n");

    // Pre-escape corrections
    dirtyReport = dirtyReport.replace(/\{(.+)\)/g, "($1)");
    dirtyReport = dirtyReport.replace(/\((.+)\}/g, "($1)");
    dirtyReport = dirtyReport.replace(/''/g, "\"");

    // Markdown escapes
    dirtyReport = dirtyReport.replace(/\[/g, "\\[");
    dirtyReport = dirtyReport.replace(/\]/g, "\\]");
    dirtyReport = dirtyReport.replace(/\*/g, "\\*");

    // Whitespace corrections
    dirtyReport = dirtyReport.replace(/\s*\,\s+/g, ", ");
    dirtyReport = dirtyReport.replace(/\s*\.\s+/g, ". ");
    dirtyReport = dirtyReport.replace(/\s*'\s*/g, "'");
    dirtyReport = dirtyReport.replace(/\(\s+/g, "(");
    dirtyReport = dirtyReport.replace(/\s+\)/g, ")");
    dirtyReport = dirtyReport.replace(/(\d+)\s*\/\s*(\d+)\s*\/\s*(\d+)/g, "$1/$2/$3");
    dirtyReport = dirtyReport.replace(/^         \b/gm, "\r\n");
    dirtyReport = dirtyReport.replace(/ {2,}/g, " ");

    // Markdown additions
    dirtyReport = dirtyReport.replace(/(?:\s*Harm\s+to\s+Ongoing\s+Matter\s*)+/gi, " **\\[ REDACTED: Harm to Ongoing Matter \\]** ");

    fs.writeFileSync("./data/mueller_report.md", dirtyReport);
    console.log("Done!");
});

const rawCSV : string = fs.readFileSync("./data/mueller_report.csv", { encoding: "utf8" });
parser.write(rawCSV);
