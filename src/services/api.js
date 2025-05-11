import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:3000/programmerBlog/v1",
  timeout: 5000,
});

export const getPosts = async () => {
  try {
    return await apiClient.get("/publications");
  } catch (e) {
    return {
      error: true,
      e,
    };
  }
};

export const giveLike = async (id) => {
  try {
    return await apiClient.patch(`/publications/like/${id}`);
  } catch (e) {
    return {
      error: true,
      e,
    };
  }
};

export const removeLike = async (id) => {
  try {
    return await apiClient.patch(`/publications/removeLike/${id}`);
  } catch (e) {
    return {
      error: true,
      e,
    };
  }
};

export const addComment = async (data, id) => {
    try {
        return await apiClient.post(`/comments/publication/${id}`, data);
      } catch (e) {
        return {
          error: true,
          e,
        };
      }
}