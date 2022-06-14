import axios from "axios";

const api = axios.create({
  baseURL: "https://akflds-news-api.herokuapp.com/api",
});

export const getArticles = (topic) => {
  return api.get("/articles", { params: { topic } }).then(({ data }) => {
    return data.articles;
  });
};
