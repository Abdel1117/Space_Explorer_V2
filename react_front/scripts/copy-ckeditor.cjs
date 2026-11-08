const fs = require("fs");
const path = require("path");

const source = path.join(__dirname, "..", "node_modules", "ckeditor4");
const destination = path.join(__dirname, "..", "public", "ckeditor4");

if (!fs.existsSync(source)) {
    console.warn("ckeditor4 introuvable dans node_modules, copie ignorée");
    process.exit(0);
}

fs.rmSync(destination, { recursive: true, force: true });

fs.cpSync(source, destination, {
    recursive: true,
    filter: (src) => !/[\\/](samples)([\\/]|$)/.test(src)
});

console.log(`CKEditor 4 copié vers ${destination}`);
