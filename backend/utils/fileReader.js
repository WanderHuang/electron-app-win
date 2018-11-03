const fs = require('fs')
const path = require('path')
const { getImageInfo } = require('./imageManager')

// 获取文件树
const getDirTree = function (base) {
  let res = []
  if (fs.lstatSync(base).isDirectory()) {
    let dirs = fs.readdirSync(base)
    for (let i = 0; i < dirs.length; i++) {
      let _path = base + path.sep + dirs[i]
      let item = {
        path: _path,
        name: path.basename(_path),
        type: 'dir',
        children: []
      }
      if (fs.lstatSync(_path).isDirectory()) {
        item.type = 'dir'
        item.children = getDirTree(_path)
      } else {
        item.type = _path.split('.')[1]
      }
      res.push(item)
    }
  }
  return res
}

// 获取文件路径数组
const getFileArray = (absolute, static) => {
  let res = []
  if (fs.lstatSync(absolute).isDirectory()) {
    let dirs = fs.readdirSync(absolute)
    for (let i = 0; i < dirs.length; i++) {
      let absolute_path = absolute + path.sep + dirs[i]
      let static_path = static + path.sep + dirs[i]
      if (fs.lstatSync(absolute_path).isDirectory()) {
        res.push(...getFileArray(absolute_path, static_path))
      } else {
        let info = getImageInfo(absolute_path)
        info.url = static_path
        res.push(info)
      }
    }
  }
  return res
}

const fileReader = {
  getDirTree: getDirTree,
  getFileArray: getFileArray
}
exports.fileReader = fileReader
