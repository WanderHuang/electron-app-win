import _config from '&/static/config.json'

// 用户登录
export const loginUrl = `${_config.host}/login`

// 阅读文章 需要带上文件路径
export const readStaticsUrl = `${_config.host}/`

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

// 获取头像列表
export const getAvatarsUrl = `${_config.host}/get/avatars`

// 增加文件目录
export const addNewDirUrl = `${_config.host}/add/dir`
