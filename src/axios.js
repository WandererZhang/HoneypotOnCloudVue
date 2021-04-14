import axios from "axios"
import Element from 'element-ui'
import router from './router'
import store from './store'

axios.defaults.baseURL = "http://124.70.197.208:8081"

axios.interceptors.request.use(config => {
  let token = window.localStorage.getItem("token")
  if (token != null) {
    config.headers.common['Access-control-Expose-Headers'] = "Authorization";
    config.headers.common['Authorization'] = token;
  }
  return config;
})

axios.interceptors.response.use(response => {
    let res = response.data;
    if (res.code === 200) {
      return response
    } else if (res.code === 233) {
      Element.Message({
        type: "success",
        message: "删除成功!",
        offset: 70
      })
      return response
    } else {
      Element.Message({
        type: "error",
        message: error.message,
        offset: 70
      })
      return Promise.reject(response.data)
    }
  },
  error => {
    if (error.response.data) {
      error.message = error.response.data.msg
    }
    if (error.response.status === 401) {
      store.commit("REMOVE_INFO")
      router.push("/login").then()
    }
    Element.Message({
      type: "error",
      message: error.message,
      offset: 70
    })
    return Promise.reject(error)
  }
)
