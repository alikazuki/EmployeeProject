import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

export const getEmployees = () => api.get("/employees").then((res) => res.data);

export const getEmployee = (id) => {
  return api.get(`/employees/${id}`).then((res) => res.data);
};

export const deleteEmployee = (id) =>
  api.delete(`/employees/${id}`).then((res) => res.data);

export const addEmployee = (values) => {
  return api.post("/employees", values);
};

export const editEmployee = (values, id) => {
  return api.patch(`/employees/${id}`, values)
}