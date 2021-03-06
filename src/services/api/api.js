import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const URL = "https://management-job.herokuapp.com";

export const getListStudent = async () => {
  const response = await axios.get(`${URL}/user/get-list-student`);
  const result = response.data.data;
  return result;
};

export const getListAdmin = async () => {
  const response = await axios.get(`${URL}/user/get-list-admin`);
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
  const response = await axios.get(`${URL}/user/get-list-ntd`);
  const result = response.data.data;
  return result;
};

export const getListNtdUnActive = async (id) => {
  const response = await axios.get(`${URL}/user/get-list-ntd-unactive`);
  const result = response.data.data;
  return result;
};

export const getListRate = async () => {
  const response = await axios.get(`${URL}/user/get-list-rate`);
  const result = response.data.data;
  return result;
};

export const getListPostActive = async () => {
  const response = await axios.get(`${URL}/user/task/list-post-active`);
  const result = response.data.data;
  return result;
};

export const getListPostUnActive = async () => {
  const response = await axios.get(`${URL}/user/task/list-post-unactive`);
  const result = response.data.data;
  return result;
};

export const login = async (data) => {
  const response = await axios.post(`${URL}/user/login`, data);
  const result = response.data;
  console.log(result);
  if (result.success == true) {
    AsyncStorage.setItem("TOKEN", result.data.secret_key);
  }
  return result;
};

export const getListPostTaskDetail = async (id) => {
  const response = await axios.get(`${URL}/user/task/get-one-post?id=${id}`);
  const result = response.data.data;
  return result;
};

export const UploadAvatar = async (data) => {
  const response = await axios.post(`${URL}/user/student-update-image`, data);
  console.log(response);
  const result = response.data.data.image;
  return result;
};

export const comfirmPostForNtd = async (data) => {
  const response = await axios.post(`${URL}/user/task/confirm-post-task`, data);
  const result = response.data;
  return result;
};

export const comfirmAccountNtd = async (data) => {
  const response = await axios.post(`${URL}/user/confirm-account`, data);
  const result = response.data;
  return result;
};

export const createAccountAdmin = async (data) => {
  const response = await axios.post(`${URL}/user/register/admin`, data);
  const result = response.data;
  return result;
};

export const deleteAccount = async (data) => {
  const response = await axios.post(`${URL}/user/delete-account`, data);
  const result = response.data;
  return result;
};
export const approveForStudent = async (data) => {
  const response = await axios.post(`${URL}/user/task/approve-for-user`, data);
  const result = response.data;
  return result;
};
export const changePassword = async (data) => {
  const response = await axios.post(`${URL}/user/change-password`, data);
  const result = response.data;
  return result;
};
