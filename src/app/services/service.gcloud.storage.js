const util = require('util');
const config = require("../../config");
const Storage = require('@google-cloud/storage');
CLOUD_BUCKET = config.parameters.cloud_bucket;
const storage = Storage({
    projectId: config.parameters.cloud_project
});
bucket = storage.bucket(CLOUD_BUCKET);

module.exports = {
    sendUploadToGCS(req, res, next) {
        if (!req.file) {
            return next();
        }
        const gcsname = buildFileName(req);
        const file = bucket.file(gcsname);
        const stream = file.createWriteStream({
            metadata: { contentType: req.file.mimetype }
        });
        stream.on('error', (err) => {
            req.file.csError = err;
            next(err);
        });
        stream.on('finish', () => {
            req.file.csObject = gcsname;
            file.makePublic().then(() => {
                req.file.csObjectUrl = config.parameters
                    .cloud_file_url(gcsname);
                next();
            });
        });
        stream.end(req.file.buffer);
    }
}
function buildFileName(req) {
    if (req.user) {
        return util.format('avatar_%s', req.user.id);
    }
    return req.file.originalname;
}