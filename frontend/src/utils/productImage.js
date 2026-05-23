const IMAGE_FOLDER = '22yards/products'

export function getProductImageUrl(productId, suffix = '01') {
    if (!productId) return ''
    const id = String(productId)
    return `${import.meta.env.VITE_SERVER_IMG}/${IMAGE_FOLDER}/${id}-${suffix}.jpg`
}
