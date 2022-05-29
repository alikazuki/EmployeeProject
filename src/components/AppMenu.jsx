import React from "react";
import { Menu } from "antd";
import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom";

const AppMenu = ({location}) => {

  return (
    <Menu
    selectedKeys={[location.pathname]}
    theme="dark"
    mode="horizontal"
  >
    <Menu.Item key="/">
      <Link to="/">Home</Link>
    </Menu.Item>
    <Menu.Item key="/EmployeesList">
      <Link to="/EmployeesList">Mitarbeiterliste</Link>
    </Menu.Item>
    <Menu.Item key="/AddEmployee">
      <Link to="/AddEmployee">Hinzufügen</Link>
    </Menu.Item>
    <Menu.Item key="/About">
      <Link to="/About">About </Link>
    </Menu.Item>
  </Menu>
  );
};

export default AppMenu;
