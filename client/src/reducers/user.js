import actionTypes from '../actions/actionTypes'

const isLogin = Boolean(window.localStorage.getItem('token')) || Boolean(window.sessionStorage.getItem('token'))

const initState = {
  user: '',
  isLogin,
  isLoading: false,
  typeColor: true,
  navFlod: false,
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

    case actionTypes.CHANGE_TYPE: {
      return {
        ...state,
        typeColor: action.typeColor,
      }
    }

    default:
      console.log('====================')
      return state
  }
}