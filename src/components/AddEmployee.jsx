import { Button, Input, Form, Select, DatePicker, InputNumber  } from "antd";
import React, { useState } from "react";
import { useMutation } from "react-query";
import * as api from "../employeesApi"
import { useQuery } from "react-query";
import { Alert } from 'antd';
import { departmentState } from "../atoms";
import { useRecoilState } from "recoil";
import moment from 'moment';
import axios from 'axios';

const AddEmployee = ({ data, isOpen }) => {
  
  const [form] = Form.useForm();

  const {mutate: addEmployee} = useMutation(api.addEmployee)

  const [showSucces, setShowSucces] = useState(false)

  const [succes, setSucces] = useState(false)

  const [department, setDepartment] = useRecoilState(departmentState);

  const { data: allEmployees } = useQuery("employees", api.getEmployees);

  const submit = async (values) => {
    if(isOpen === true){
      axios.patch(`http://localhost:5000/employees/${data?.id}`, values)
    }
    else if(isOpen === undefined){
      setShowSucces(true)
    allEmployees?.map((emp) => {
      if(values.nummer === emp.nummer){
        console.log(values.nummer)
        setSucces(false)
        return
      }else{
        setSucces(true)
      }
    })
    addEmployee(values)
    }
  };

  data = {...data, datum: data?.datum ? moment(data?.datum) : undefined}

  return (
    <div>
      <span></span>
      <Form
        form={form}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={ data }
        onFinish={ submit }
      >
        <Form.Item 
        name="name" 
        label="Name"
        rules={[
          {
            required: true,
            message: 'Name muss mit angegeben werden!',
          }
          ]}>
          <Input />
        </Form.Item>
        <Form.Item 
        name="nummer" 
        label="Mitarbeiternummer" 
        rules={[
          {
            required: true,
            type: "integer",
            message: 'Mitarbeiternummer darf nur aus Zahlen bestehen!',
          }]}>
        <InputNumber defaultValue={0} />
        </Form.Item>
        <Form.Item name="abteilung" label="Abteilung">
          <Select>
            <Select.Option value={department[0]}>IT</Select.Option>
            <Select.Option value={department[1]}>Vertrieb</Select.Option>
            <Select.Option value={department[2]}>Buchhaltung</Select.Option>
            <Select.Option value={department[3]}>Marketing</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="datum" label="Eintrittsdatum">
          <DatePicker />
        </Form.Item>
        <Form.Item label="Speichern">
          <Button htmlType="submit">Submit</Button>
        </Form.Item>
        {showSucces === true && succes === true && <Alert message="Mitarbieter erfolgreich eingetragen!" type="success" showIcon />}
        {showSucces === true && succes === false && <Alert message="Mitarbeiternummer schon vergeben" type="error" showIcon />}
      </Form>
    </div>
  );
};

export default AddEmployee;
