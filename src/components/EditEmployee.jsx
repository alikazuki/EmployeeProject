import React from "react";
import { openState } from "../atoms";
import { useRecoilState } from "recoil";
import AddEmployee from "./AddEmployee";
import {
  Drawer,
  Button,
  Select,
  Space,
} from "antd";

const { Option } = Select;

const EditEmployee = ({data}) => {
  const isOpen = true;

  const [open, setOpen] = useRecoilState(openState);

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Drawer
        title="Create a new account"
        width={720}
        onClose={onClose}
        visible={open}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
          </Space>
        }
      >
        <AddEmployee data={data} isOpen={isOpen}></AddEmployee>
      </Drawer>
    </>
  );
};

export default EditEmployee;
