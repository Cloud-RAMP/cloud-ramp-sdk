import * as fs from "fs";
import * as path from "path";

const sourceFile = path.join(__dirname, "../template/user.ts");
const destinationFile = path.join(process.cwd(), "user.ts");

if (!fs.existsSync(destinationFile)) {
  fs.copyFileSync(sourceFile, destinationFile);
  console.log("Created blank user.ts file in your project.");
} else {
  console.log("user.ts already exists. Skipping file creation.");
}