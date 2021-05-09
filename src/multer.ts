import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, path.join(__dirname, "uploads"));
    },
    filename(req, file, cb) {
        cb(null, `${+new Date()}-${file.originalname}`);
    },
});

const uploads = multer({ storage });

export default uploads;
