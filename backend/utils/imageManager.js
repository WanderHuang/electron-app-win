/**
 * 图片处理方法
 */
// const sharp = require('sharp') // 图像处理
const sizeOf = require('image-size')
// const imageDir = 'docs/static/img/'

/**
 * get info
 * {width, height, type}
 */
exports.getImageInfo = (path) => sizeOf(path)