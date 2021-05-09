import multer from "multer";
import path from "path";

import { debug } from "./config/config.json";

const storage = multer.diskStorage({
    destination(_, __, cb) {
        cb(
            null,
            debug
                ? path.join(__dirname, "uploads")
                : "/srv/deadpool.cloudez.io/etc/uploads"
        );
    },
    filename(_, file, cb) {
        cb(null, `${+new Date()}-${file.originalname}`);
    },
});

const uploads = multer({ storage });

export default uploads;
