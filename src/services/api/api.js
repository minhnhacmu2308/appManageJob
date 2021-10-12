import axios from "axios";
const URL = "http:192.168.1.5:3000";

export const getListStudent = async () => {
  const response = await axios.get(`${URL}/user/get-list-student`);
  const result = response.data.data;
  return result;
};
export const getInformationStudent = async (id) => {
  const response = await axios.get(`${URL}/user/get-one-sv?id=${id}`);
  const result = response.data.data;
  return result;
};

export const getInformationNtd = async (id) => {
  const response = await axios.get(`${URL}/user/get-one-Ntd?id=${id}`);
  const result = response.data.data;
  return result;
};

export const getListNtdActive = async (id) => {
  const response = await axios.get(`${URL}/user/get-list-ntd-active`);
  const result = response.data.data;
  return result;
};
