// ---------------------------------- 阻止浏览器的默认行为 ----------------------------------
let defaultEventPrevent = e => {
  e.stopPropagation()
  e.preventDefault()
}
document.addEventListener('drop', defaultEventPrevent)
document.addEventListener('dragenter', defaultEventPrevent)
document.addEventListener('dragleave', defaultEventPrevent)
document.addEventListener('dragover', defaultEventPrevent)
console.log('common js is loaded...')
