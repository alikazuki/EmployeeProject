import "../EmployeeList.css";
import { useQuery } from "react-query";
import { useState } from "react";
import { Switch } from "antd";
import * as api from "../employeesApi";
import EmployeesCardView from "./EmployeesCardView";
import EmployeesTableView from "./EmployeesTableView";
import { LeftCircleFilled } from "@ant-design/icons";

const EmployeeList = () => {
  const { data, status, refetch } = useQuery("employees", api.getEmployees);

  const [check, setCheck] = useState(false);

  if (status === "error") {
    return <div>Error</div>;
  }

  if (status === "loading") {
    return <div>loading</div>;
  }

  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
    if(checked === true){
      setCheck(true)
    }else{
      setCheck(false)
    }
  };

  return (
    <>
      <div style={{ marginBottom: 10}}>
      <Switch onChange={onChange} style={{ marginRight: 10}}/>
      <span>Set Table Mode</span>
      </div>
      {check === true && (<EmployeesTableView data={data}></EmployeesTableView>)}
      {check === false && (<EmployeesCardView data={data}></EmployeesCardView>)}
    </>
  );
};

export default EmployeeList;
