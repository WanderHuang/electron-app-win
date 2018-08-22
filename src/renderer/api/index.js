import _config from '&/static/config.json'

// 阅读文章 需要带上文件路径
export const readArticleUrl = `${_config.host}/`

// 获取文件树
export const getDirTreeUrl = `${_config.host}/getDirTree`

// 上传文件
export const uploadUrl = `${_config.host}/upload`

// 文件下载
export const downloadUrl = `${_config.host}/docs/get`

// 删除文件
export const deleteUrl = `${_config.host}/docs/delete`

// 获取图像列表
export const getStaticImagesUrl = `${_config.host}/get/images`

// 增加文件目录
export const addNewDirUrl = `${_config.host}/add/dir`
