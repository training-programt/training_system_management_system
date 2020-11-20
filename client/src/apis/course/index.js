import base from '../base'
import axios from '../../https/index'

export default {
    getCourseList(params) {
    return new Promise((resolve, reject) => {
      axios.get(`${base.getCourseList}`, params).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
}
