import base from '../base'
import axios from '../../https/index'

export default {
  getTeacherList(params) {
    return new Promise((resolve, reject) => {
      axios.get(`${base.getTeacherList}`, params).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
}
