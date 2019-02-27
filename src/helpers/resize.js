const fs = require('fs');
const sharp = require('sharp');
const path = require('path');

module.exports = function resize(pathToRead, format, width, height) {
    // if (!pathToRead) return res.status(500).send('No path specified');
    if (!pathToRead) pathToRead = 'users/default.png';
    pathToRead = path.join(__dirname, '../public/img/'+pathToRead);
    const readStream = fs.createReadStream(pathToRead);
    let transform = sharp();
    if (format) {
        transform = transform.toFormat(format);
    }
    if (width || height) {
        transform = transform.resize(width, height);
    }
    return readStream.pipe(transform);
}