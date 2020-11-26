import base from '../base'
import axios from '../../https/index'

export default {
  getSemesterList(params) {
    return new Promise((resolve, reject) => {
      axios.get(`${base.getSemesterList}`, params).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  getGradeList(params) {
    return new Promise((resolve, reject) => {
      axios.get(`${base.getGradeList}`, params).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
}
