import * as fs from "fs";
let inReport : string = fs.readFileSync("./dist/mueller_report.md", { encoding: "utf8" });
const wordsList : string[] =
    fs.readFileSync("./data/words_list.txt", { encoding: "utf8" })
    .split(/\r?\n/g)
    .filter((word : string) : boolean => (word.length > 6));

console.log(`Fixing ${wordsList.length} words.`);

wordsList.forEach((word : string) : void => {
    const reString : string = `\\b${word.split("").join(" *")}\\b`;
    console.log(`Replacing regex '${reString}' with ${word}.`);
    const regex : RegExp = new RegExp(reString, "gi");
    inReport = inReport.replace(regex, word);
});

fs.writeFileSync("./data/mueller_report2.md", inReport);
console.log("Done!");