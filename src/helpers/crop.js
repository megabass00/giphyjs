const sharp = require('sharp');

module.exports = function(imagePath, outputImagePath, width, height) {
    sharp(imagePath)
        .resize(height, width)
        .crop()
        .toFile(outputImagePath)
        .then( (ImageResult) => {
            response.status(200).json({
                error : false,
                filepath: outputImageName,
                message: 'Image crop succesfully'
            });
        }).
        catch( () => {
            response.status(500).json({
            error : true,
            message : 'ERROR: Image crop failed'
        });
    });
}