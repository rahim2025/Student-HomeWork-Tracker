import api from "./api";

export const getAllRecords = async () => {
  const { data } = await api.get("/homework");
  return data;
};

export const getRecordByDate = async (date) => {
  const { data } = await api.get(`/homework/${date}`);
  return data;
};

export const createRecord = async (record) => {
  const { data } = await api.post("/homework", record);
  return data;
};

export const updateRecord = async (date, record) => {
  const { data } = await api.put(`/homework/${date}`, record);
  return data;
};

export const deleteRecord = async (date) => {
  const { data } = await api.delete(`/homework/${date}`);
  return data;
};
