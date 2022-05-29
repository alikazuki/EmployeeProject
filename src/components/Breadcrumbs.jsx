import React from 'react'
import { Layout, Breadcrumb } from "antd";

const Breadcrumbs = ({location}) => {
  return (
    <Breadcrumb style={{ margin: "16px 0" }}>
              {location.pathname === "/" && (
                <Breadcrumb.Item> Home</Breadcrumb.Item>
              )}
              {location.pathname === "/EmployeesList" && (
                <Breadcrumb.Item> Mitarbeiterliste</Breadcrumb.Item>
              )}
              {location.pathname === "/AddEmployee" && (
                <Breadcrumb.Item> Hinzufügen</Breadcrumb.Item>
              )}
              {location.pathname === "/About" && (
                <Breadcrumb.Item> About</Breadcrumb.Item>
              )}
            </Breadcrumb>
  )
}

export default Breadcrumbs