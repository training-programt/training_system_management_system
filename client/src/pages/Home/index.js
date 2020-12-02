import React, { useEffect} from 'react';
import { Card, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import axios from '../../https'

const Home = () => {

  const user = useSelector(state => state.user)

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
      <Button onClick = {() => dispatch({type: 'SET_USER', user: 'admin'})} > dianji </Button> 
    </Card>
  )
}

export default Home;