import base from '../base'
import axios from '../../https/index'

export default {
  getMajorList(params) {
    return new Promise((resolve, reject) => {
      axios.get(`${base.getMajorList}`, params).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
}
