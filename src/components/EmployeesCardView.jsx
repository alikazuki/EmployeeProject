import React from "react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Card, Select } from "antd";
import { idState, departmentState } from "../atoms";
import { useRecoilState } from "recoil";

const EmployeesCardView = ({ data }) => {
  const { Option } = Select;

  const [employees, setEmployees] = useState(data);

  const [department, setDepartment] = useRecoilState(departmentState);

  const [id, setId] = useRecoilState(idState);

  const children = [];
  for (let i = 0; i < department.length; i++) {
    children.push(<Option key={department[i]}>{department[i]}</Option>);
  }

  const handleChangeSelection = (value) => {
    if (value.length === 0) {
      return;
    } else {
      let temp = [];
      for (let i = 0; i < value.length; i++) {
        data?.map((emp) => {
          if (emp.abteilung === value[i]) {
            temp.push(emp);
          }
        });
      }
      setEmployees(temp);
    }
  };

  const handleChangeInput = (value) => {
    let temp = [];
    data?.map((emp) => {
      if (emp.name === value) {
        temp.push(emp);
      }
    });
    setEmployees(temp);
  };

  useEffect(() => {
    if (employees === undefined) {
      setEmployees(data);
    }
  }, []);

  return (
    <>
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Search to Select"
        optionFilterProp="children"
        onChange={handleChangeInput}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        filterSort={(optionA, optionB) =>
          optionA.children
            .toLowerCase()
            .localeCompare(optionB.children.toLowerCase())
        }
      >
        {data?.map((emp) => {
          return <Option value={emp.name}>{emp.name}</Option>;
        })}
      </Select>
      <Select
        mode="multiple"
        size={children.length}
        placeholder="Please select"
        defaultValue={[]}
        onChange={handleChangeSelection}
        style={{ width: "100%" }}
      >
        {children}
      </Select>
      <br />
      <div className="cardHolder">
        {employees?.map((employee) => {
          return (
            <Link to={"/EmployeeList/" + employee.id}>
              <Card
                className="card"
                title={employee.name}
                onClick={() => {
                  setId(employee.id);
                }}
                style={{ width: 300 }}
                key={employee.id}
              >
                <p>Mitarbeiternummer: {employee.nummer}</p>
                <p>Abteilung: {employee.abteilung}</p>
                <p>
                  Eintrittsdatum: {dayjs(employee.datum).format("DD/MM/YYYY")}
                </p>
              </Card>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default EmployeesCardView;
