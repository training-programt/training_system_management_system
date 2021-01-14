import React from 'react'
import LoadableComponent from '../utils/loadableComponent'
const Course = LoadableComponent(import('../pages/Course'), true);
const Grade = LoadableComponent(import('../pages/Grade'), true);
const LeaderMajor = LoadableComponent(import('../pages/Major/leaderMajor'), true);
const Teacher = LoadableComponent(import('../pages/Teacher'), true);
const TeachRoom = LoadableComponent(import('../pages/TeachRoom'), true);
const Home = LoadableComponent(import('../pages/Home'), true);
const Setting = LoadableComponent(import('../pages/Setting/Menu'), true);
const Menu = LoadableComponent(import('../pages/Setting/Menu'), true);
const User = LoadableComponent(import('../pages/Setting/User'), true);
const Role = LoadableComponent(import('../pages/Setting/Role'), true);
const UserInfo = LoadableComponent(import('../pages/UserInfo'), true);



export default {
  Home: <Home />,
  Setting: <Setting />,
  Menu: <Menu/>,
  Course: <Course />,
  User:<User/>,
  Grade: <Grade />,
  Major: <LeaderMajor />,
  Teacher: <Teacher />,
  TeachRoom: <TeachRoom />,
  TeachRoom2: <Role />,
  Role: <Role/>,
  UserInfo:<UserInfo/>,

};

