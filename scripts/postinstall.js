import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceFolder = path.join(__dirname, "../assembly");
const destinationFolder = path.join(__dirname, "../../../assembly");

if (!fs.existsSync(destinationFolder)) {
  fs.cpSync(sourceFolder, destinationFolder, { recursive: true });
  console.log("Initialization complete. Start editing your code in assembly/user.ts!");
} else {
  console.log("'assembly' folder already exists in the user's project.");
}