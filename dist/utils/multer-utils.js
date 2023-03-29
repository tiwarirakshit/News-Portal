"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runMiddleware = exports.multerFileTypeFilterForImage = exports.MULTER_UPLOAD_SIZE_LIMIT = void 0;
exports.MULTER_UPLOAD_SIZE_LIMIT = 2000000;
function multerFileTypeFilterForImage(req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        // check for extension also
        const extension = file.originalname.split('.').pop(); // this will give last element
        // check for if extension allowed
        if (['pdf', 'jpeg', 'jpg', 'png'].includes(extension)) {
            cb(null, true);
        }
        else {
            cb({ code: 'JPEG_PNG_PDF' }, false);
        }
    }
    else {
        cb({ code: 'JPEG_PNG_PDF' }, false);
    }
}
exports.multerFileTypeFilterForImage = multerFileTypeFilterForImage;
function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
}
exports.runMiddleware = runMiddleware;
//# sourceMappingURL=multer-utils.js.map