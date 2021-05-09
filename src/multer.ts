import multer from "multer";

const storage = multer.diskStorage({
    destination(_, __, cb) {
        cb(null, "/srv/deadpool.cloudez.io/etc/uploads");
    },
    filename(_, file, cb) {
        cb(null, `${+new Date()}-${file.originalname}`);
    },
});

const uploads = multer({ storage });

export default uploads;
