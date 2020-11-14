import base from './base'
import axios from '../https/index'

export default {
  getDepartmentList(params) {
    return new Promise((resolve, reject) => {
      axios.post(`${base.getDepartmentList}`, params).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
}