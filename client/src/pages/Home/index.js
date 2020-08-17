import React, {
  useCallback
} from 'react';
import {
  Card,
  Button
} from 'antd';
import {
  useDispatch,
  useMappedState
} from 'redux-react-hook'

import shallowequal from 'shallowequal';

const Home = () => {

  const mapState = useCallback(state => ({
    user: state.user
  }), [])
  const {
    user
  } = useMappedState(mapState, shallowequal)
  const dispatch = useDispatch()
  const btnClick = () => {
    dispatch({
      type: 'SET_USER',
      user: 'admin',
    })
  }

  return ( 
    <Card
      title={user.user}
    >
      {/* <h1> {user} </h1>  */}
      
      <Button onClick = {btnClick} > dianji </Button> 
    </Card>
  )
}

export default Home;