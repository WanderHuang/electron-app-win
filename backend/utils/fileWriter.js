const fs = require('fs')

const addNewDirectory = (dir, name) => {
  console.log(`dir path: ${dir}`)
  if (fs.existsSync(dir)) {
    return false
  } else {
    fs.mkdirSync(dir)
    return true
  }
}

const fileWriter = {
  addNewDirectory: addNewDirectory
}
exports.fileWriter = fileWriter
