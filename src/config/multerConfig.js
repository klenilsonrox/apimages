import multer from "multer"
import {extname,resolve} from "path"
import { v4 } from "uuid";
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);



export default {
    storage: multer.memoryStorage()
}