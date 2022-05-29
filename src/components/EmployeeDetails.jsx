import React from "react";
import { Link } from "react-router-dom";
import { Button, Card } from "antd";
import { EditOutlined, CloseOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useQuery, useMutation } from "react-query";
import * as api from "../employeesApi";
import { idState, openState } from "../atoms";
import { useRecoilState } from "recoil";
import dayjs from "dayjs";
import EditEmployee from "./EditEmployee";

const { Meta } = Card;

const Employeedetails = () => {
  const [id, setId] = useRecoilState(idState);

  const [open, setOpen] = useRecoilState(openState);

  const [deleted, setDeleted] = useState(false);

  const { data, refetch } = useQuery(["employee", id], () => api.getEmployee(id), {
    enabled: id > 0,
  });

  const deleteOpener = () => {
    setDeleted(true);
  };

  const openDrawer = () => {
    setOpen(true)
  };

  const { mutate: deleteEmploye } = useMutation(api.deleteEmployee, {
    onSuccess: deleteOpener,
  });

  return (
    <div>
      {deleted === true && (
        <div>
          <h1>{data?.name} wurde gelöscht</h1>
          <Link to="/EmployeesList">Go Back</Link>
        </div>
      )}
      {deleted === false && (
        <Card
          title={data?.name}
          style={{ width: 300, marginTop: 16 }}
          actions={[<EditOutlined key="edit" onClick={openDrawer} />]}
          extra={
            <Button
              type="primary"
              shape="circle"
              style={{ margin: "0 10px" }}
              onClick={() => {
                deleteEmploye(data?.id);
              }}
            >
              <CloseOutlined />
            </Button>
          }
        >
          <p>Mitarbeiternummer: {data?.nummer} </p>
          <p>Abteilung: {data?.abteilung} </p>
          <p>Eintrittsdatum: {dayjs(data?.datum).format("DD/MM/YYYY")} </p>
        </Card>
      )}
      <EditEmployee data={data} ></EditEmployee>
    </div>
  );
};

export default Employeedetails;
