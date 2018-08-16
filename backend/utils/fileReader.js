const fs = require('fs')
const path = require('path')

// 获取文件树
const getDirTree = function (base) {
  let res = []
  console.log(`-----  ${base}`)
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

const fileReader = {
  getDirTree: getDirTree
}
exports.fileReader = fileReader
