import fs from "fs";
import path from "path";

const moduleName = process.argv[2];

if (!moduleName) {
    console.error("Please provide a module name.");
    process.exit(1);
}

const moduleDir = path.join("src", moduleName);

if (fs.existsSync(moduleDir)) {
    console.error(`Module "${moduleName}" already exists.`);
    process.exit(1);
}

fs.mkdirSync(moduleDir);

const templateFiles = ["index.ts", "types.d.ts"];
templateFiles.forEach((file) => {
    const templatePath = path.join("module", file);
    const targetPath = path.join(moduleDir, file);
    fs.copyFileSync(templatePath, targetPath);
});

const indexPath = path.join(moduleDir, "index.ts");
const indexContent = fs.readFileSync(indexPath, "utf8");
const updatedIndexContent = indexContent.replace(/<module_name>/g, moduleName);
fs.writeFileSync(indexPath, updatedIndexContent);

const typePath = path.join(moduleDir, "types.d.ts");
const typeContent = fs.readFileSync(typePath, "utf8");
const updatedTypeContent = typeContent.replace(/<module_name>/g, moduleName);
fs.writeFileSync(typePath, updatedTypeContent);

console.log(`Module "${moduleName}" created successfully.`);
