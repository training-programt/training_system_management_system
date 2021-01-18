import actionTypes from '../actions/actionTypes'

export default (state = {}, action) => {
  switch (action.type) {
    case actionTypes.SET_MENUS:
      return {
        menu:action.menus
      }
    default:
      return state
  }
}