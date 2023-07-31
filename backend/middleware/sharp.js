const sharp = require('sharp');

module.exports = (req, res, next) => {
    let input = req.file.path

    if(input) {
        const newFileName = "optimized_" + req.file.filename
        let newPath = "images/" + newFileName
        sharp(input).resize(300, 500).toFile(newPath)
        .then(() => {
            req.file.path = newPath
            req.file.filename = newFileName
            next()
        })
    } else {
        next();
    }
}
