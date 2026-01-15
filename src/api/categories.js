import api from "./axios";


// list
export const listCategoriesApi = async () => {
  const res = await api.get("/api/categories");
  return res.data;
};
