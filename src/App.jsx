import { useState } from "react";
import React from "react";
import { Layout, Breadcrumb } from "antd";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
} from "react-router-dom";
import About from "./components/About";
import EmployeesList from "./components/EmployeesList";
import Home from "./components/Home";
import Contact from "./components/AddEmployee";
import Employeedetails from "./components/EmployeeDetails";
import AppMenu from "./components/AppMenu";
import Breadcrumbs from "./components/Breadcrumbs";
import { RecoilRoot } from "recoil";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

const App = () => {
  const { Header, Content, Footer } = Layout;

  let location = useLocation();

  const [id, setId] = useState(2)

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Layout className="layout">
          <Header>
            <div className="logo" />
            <AppMenu location={location}></AppMenu>
          </Header>
          <Content style={{ padding: "0 50px" }}>
            <Breadcrumbs location={location} ></Breadcrumbs>
            <div className="site-layout-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/EmployeesList" element={<EmployeesList />} />
                <Route path="/About" element={<About />} />
                <Route path="/AddEmployee" element={<Contact />} />
                <Route path="EmployeeList/:id" element={<Employeedetails />}></Route>
              </Routes>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}></Footer>
        </Layout>
      </RecoilRoot>
    </QueryClientProvider>
  );
};

export default App;
