import { fileURLToPath } from "url";
import { dirname, join } from "path";


// Variables de ruteo

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const viewsPath = join(__dirname + "/views");
const publicPath = join(__dirname + "/public");


 



export { __dirname, viewsPath, publicPath, __filename };
