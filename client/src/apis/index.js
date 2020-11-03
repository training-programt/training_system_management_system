import base from './base'
import axios from '../https/index'

export default {
  getToken(params) {
    return new Promise((resolve, reject) => {
      axios.post(`${base.getToken}`, params).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

  login(params) {
    return new Promise((resolve, reject) => {
      axios.post(`${base.login}`, params).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }
}
