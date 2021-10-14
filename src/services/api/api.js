import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
const URL = "http:192.168.1.7:3000";

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

export const getListRate = async() => {
  const response = await axios.get(`${URL}/user/get-list-rate`);
  const result = response.data.data;
  return result;
}

export const getListPostActive = async() => {
  const response = await axios.get(`${URL}/user/task/list-post-active`);
  const result = response.data.data;
  return result;
}

export const getListPostUnActive = async() => {
  const response = await axios.get(`${URL}/user/task/list-post-unactive`);
  const result = response.data.data;
  return result;
}

export const login = async(data) => {
  const response = await axios.post(`${URL}/user/login`,data);
  const result = response.data;
  console.log(result);
  AsyncStorage.setItem("TOKEN",result.data.secret_key);
  return result;
}

export const getListPostTaskDetail = async(id) => {
  const response = await axios.get(`${URL}/user/task/get-one-post?id=${id}`);
  const result = response.data.data;
  return result;
}

export const UploadAvatar = async(data) => {
  const response = await axios.post(`${URL}/user/student-update-image`,data);
  const result = response.data.data.image;
  return result;
}
