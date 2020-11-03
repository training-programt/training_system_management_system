import actionTypes from '../actions/actionTypes'
import { getSession } from '../utils'

const isLogin = Boolean(getSession('token'))

const initState = {
  user: 'aa',
  isLogin,
  typeColor: true,
  isLoading: false,
  roles: ['001'],
}

export default (state = initState, action) => {
  switch (action.type) {
    case actionTypes.START_LOGIN:
      return {
        ...state,
        isLoading: true
      }
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLogin: true
      }
    case actionTypes.LOGIN_FAILED:
      return {
        isLogin: false,
        isLoading: false,
        roles: ['001'],
      }
    case actionTypes.LOGOUT:
      return {
        isLogin: false,
        isLoading: false,
        roles: ['001'],
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