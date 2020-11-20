import actionTypes from '../actions/actionTypes'
import { getSession } from '../utils'

const isLogin = Boolean(getSession('token'))
const userInfo = JSON.parse(getSession('userInfo'))

const initState = {
  isLogin,
  isLoading: false,
  roles: 1,
  ...userInfo,
}
export default (state = initState, action) => {
  switch (action.type) {
    case actionTypes.START_LOGIN:
      return {
        ...state,
        isLoading: true
      }
    case actionTypes.LOGIN_SUCCESS:
      console.log(action.payload.userInfo);
      return {
        ...state,
        ...action.payload.userInfo,
        isLoading: false,
        isLogin: true
      }
    case actionTypes.LOGIN_FAILED:
      return {
        isLogin: false,
        isLoading: false,
        roles: 1,
      }
    case actionTypes.LOGOUT:
      return {
        isLogin: false,
        isLoading: false,
        roles: 1,
      }
    case actionTypes.CHANGE_TYPE: {
      return {
        ...state,
        typeColor: action.typeColor,
      }
    }

    default:
      return state
  }
}