import multer, { diskStorage } from "multer";
import { v4 as uuid } from "uuid";
import path from "path";

export const storage = diskStorage({
  destination: "uploads/",

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${uuid()}${ext}`);
  },
});

export const upload = multer({ storage });
