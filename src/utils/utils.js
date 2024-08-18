import { fileURLToPath } from "url";
import { dirname, join } from "path";


// Variables de ruteo

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Subir un nivel para alcanzar la raíz del proyecto
const rootDir = join(__dirname, "..");


const viewsPath = join(rootDir, "views");
const publicPath = join(rootDir, "public");


 



export { __dirname, viewsPath, publicPath, __filename };
