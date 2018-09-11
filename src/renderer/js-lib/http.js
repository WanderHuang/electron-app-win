import axios from 'axios'

// 转为表单数据
let getFormData = (params) => {
  let form = new FormData()
  for (let p in params) {
    form.append(p, params[p])
  }
  return form
}

// get方法
let get = (url, params, config) => {
  axios.get(url, {params}).then(res => {
    console.log(res)
    let success = config.success
    success && success()
  })
}

// post方法
let post = (url, params, config) => {
  params = config.form ? getFormData(params) : params
  axios.post(url, params, config).then(res => {
    if (res.status === 200) {
      let success = config.success
      success && success(res.data)
    } else {
      let fail = config.fail
      fail && fail()
    }
  })
}

export {get, post}
