
import Vue from 'vue'
import VueResource from 'vue-resource'
import { rootPath, errHandler } from './config'

Vue.use(VueResource)

Vue.http.options.root = rootPath
Vue.http.options.emulateJSON = true
Vue.http.options.xhr = { withCredentials: true }

const xhr = ({ url, body, method = 'get' }) => {
  // 引入了 ES6 的 Promise 实现
  return new Promise((resolve, reject) => {
    Vue.http[method.toLowerCase()](rootPath + url, body)
      .then(({ data }) => { // 从封装体中解构出data字段
        if (!data) // 读取 undefined/null 的属性会报错
          return resolve(null)

        if (data._code)
          return errHandler(data._msg)

        resolve(data)
      }, errHandler)
  })
}

export default xhr
