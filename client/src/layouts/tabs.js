import React from 'react'
import LoadableComponent from '../utils/loadableComponent'
const Course = LoadableComponent(import('../pages/Course'), true);
const Grade = LoadableComponent(import('../pages/Grade'), true);
const Major = LoadableComponent(import('../pages/Major'), true);
const Teacher = LoadableComponent(import('../pages/Teacher'), true);
const TeachRoom = LoadableComponent(import('../pages/TeachRoom'), true);
const Home = LoadableComponent(import('../pages/Home'), true);
const Setting = LoadableComponent(import('../pages/Setting/Menu'), true);
const Menu = LoadableComponent(import('../pages/Setting/Menu'), true);
const User = LoadableComponent(import('../pages/Setting/User'), true);
const Role = LoadableComponent(import('../pages/Setting/Role'), true);

export default {
  Home: <Home />,
  Setting: <Setting />,
  Menu: <Menu/>,
  Course: <Course />,
  User:<User/>,
  Grade: <Grade />,
  Major: <Major />,
  Teacher: <Teacher />,
  TeachRoom: <TeachRoom />,
  TeachRoom2: <Role />,
  Role: <Role/>,
};

