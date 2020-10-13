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
      <Button onClick={btnClick} > 点击 </Button>
    </Card>
  )
}

export default Home;