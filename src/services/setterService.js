import xhr from './xhr/'
/**
 * 对应后端的 /setter/* 所有 API
 */
class setterService {

  urlMap (){
    return{
      list: '/list'
    }
  }
  /**
   * @return {Promise}
   */
  fetch ({ url , method, body} = {}) {
    return xhr({
      method: 'post',
      url: this.urlMap[url],
      body: body
    })
  }


}

// 实例化后再导出
export default new setterService()
