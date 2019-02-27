const sharp = require('sharp');

module.exports = function(imagePath, outputImagePath, width, height) {
    sharp(imagePath)
        .resize(height, width) // Use resize otherwise it applies crop (From the Doc). 
        .max()
        .toFile(outputImagePath)
        .then( (ImageResult) => {
            response.status(200).json({
                error : false,
                filepath: outputImageName,
                message: 'Image scale succesfully'
            });
        })
        .catch( () => {
            response.status(500).json({
            error : true,
            message : 'ERROR: Image scale failed'
        });
    });
}