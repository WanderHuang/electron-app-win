const fs = require('fs')
const path = require('path')

const getDirTree = function (res, base) {
  console.log('BaseDir: ' + base)
  if (fs.lstatSync(base).isDirectory()) {
    let dirs = fs.readdirSync(base)
    for (let i = 0; i < dirs.length; i++) {
      let _path = base + '\\' + dirs[i]
      let item = {
        path: _path,
        name: path.basename(_path),
        type: 'dir',
        children: []
      }
      if (fs.lstatSync(_path).isDirectory()) {
        item.type = 'dir'
        getDirTree(item.children, _path)
      } else {
        item.type = _path.split('.')[1]
      }
      res.push(item)
    }
  }
}

const fileReader = {
  getDirTree: getDirTree
}
exports.fileReader = fileReader
