import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// folder / file destinatinons for copy operations
const sourceFolder = path.join(__dirname, "../assembly");
const destinationFolder = path.join(__dirname, "../../../assembly");
const userPackageJsonPath = path.join(__dirname, "../../../package.json");
const asconfigPath = path.join(__dirname, "../../../asconfig.json");

// Create defualt package.json if it does not exist
if (!fs.existsSync(userPackageJsonPath)) {
  const defaultPackageJson = {
    name: "user-project",
    version: "1.0.0",
    description: "",
    main: "index.js",
    scripts: {},
    keywords: [],
    author: "",
    license: "ISC"
  };

  fs.writeFileSync(userPackageJsonPath, JSON.stringify(defaultPackageJson, null, 2));
}

// Read and update package.json, update scripts
const packageJson = JSON.parse(fs.readFileSync(userPackageJsonPath, "utf-8"));
packageJson.scripts = {
  ...packageJson.scripts,
  "asbuild:debug": "asc assembly/index.ts --target debug",
  "asbuild:release": "asc assembly/index.ts --target release",
  "asbuild": "npm run asbuild:debug && npm run asbuild:release",
};

// Create asconfig.json file
if (!fs.existsSync(asconfigPath)) {
  const asconfigData = {
    targets: {
      debug: {
        outFile: "build/debug.wasm",
        textFile: "build/debug.wat",
        sourceMap: true,
        debug: true
      },
      release: {
        outFile: "build/release.wasm",
        textFile: "build/release.wat",
        sourceMap: true,
        optimizeLevel: 3,
        shrinkLevel: 0,
        converge: false,
        noAssert: false
      }
    },
    options: {
      bindings: "esm",
      exportRuntime: true
    }
  };

  fs.writeFileSync(asconfigPath, JSON.stringify(asconfigData, null, 2));
} else {
  console.log("asconfig.json already exists.");
}

// Write the updated package.json back to the user's project
fs.writeFileSync(userPackageJsonPath, JSON.stringify(packageJson, null, 2));
console.log("Updated user's package.json with new commands.");

// Ensure assembly folder exists
if (!fs.existsSync(destinationFolder)) {
  fs.cpSync(sourceFolder, destinationFolder, { recursive: true });
  console.log("Initialization complete. Start editing your code in assembly/user.ts!");
} else {
  console.log("'assembly' folder already exists in the user's project.");
}
