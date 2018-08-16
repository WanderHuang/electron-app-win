import _config from '&/static/config.json'

// 阅读文章
export const readArticleUrl = `${_config.host}/readArticleByPath`

// 加载PDF
export const readPdfUrl = `${_config.host}/readPdfByPath`

// 获取文件树
export const getDirTreeUrl = `${_config.host}/getDirTree`

// 上传文件
export const uploadUrl = `${_config.host}/upload`

// 文件下载
export const downloadUrl = `${_config.host}/docs/get`

// 删除文件
export const deleteUrl = `${_config.host}/docs/delete`
