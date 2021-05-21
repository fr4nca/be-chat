import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination(_, __, cb) {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename(_, file, cb) {
    cb(null, `${+new Date()}-${file.originalname}`);
  },
});

const uploads = multer({ storage });

export default uploads;
