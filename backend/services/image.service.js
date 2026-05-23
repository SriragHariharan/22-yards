const sharp = require('sharp')
const cloudinary = require('../config/cloudinary')

const IMAGE_FOLDER = '22yards/products'
const IMAGE_KEYS = ['image1', 'image2', 'image3']
const IMAGE_SUFFIXES = ['01', '02', '03']

const uploadBufferToCloudinary = (buffer, publicId) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: IMAGE_FOLDER,
                public_id: publicId,
                overwrite: true,
                resource_type: 'image',
            },
            (error, result) => {
                if (error) return reject(error)
                resolve(result)
            }
        )
        stream.end(buffer)
    })
}

const processAndUploadImage = async (fileBuffer, productId, suffix) => {
    const processedBuffer = await sharp(fileBuffer)
        .resize(1024, 1024, {
            fit: 'contain',
            background: { r: 255, g: 255, b: 255 },
        })
        .jpeg()
        .toBuffer()

    return uploadBufferToCloudinary(processedBuffer, `${productId}-${suffix}`)
}

const uploadProductImages = async (productId, files) => {
    const uploads = IMAGE_KEYS.map((key, index) => {
        if (!files?.[key]?.data) {
            throw new Error(`Missing ${key}`)
        }
        return processAndUploadImage(files[key].data, productId, IMAGE_SUFFIXES[index])
    })

    return Promise.all(uploads)
}

const deleteProductImages = async (productId) => {
    const deletions = IMAGE_SUFFIXES.map((suffix) =>
        cloudinary.uploader.destroy(`${IMAGE_FOLDER}/${productId}-${suffix}`)
    )
    await Promise.allSettled(deletions)
}

module.exports = {
    uploadProductImages,
    deleteProductImages,
}
