import axios from "axios";

const api = axios.create({
  baseURL: "https://akflds-news-api.herokuapp.com/api",
});

export const getArticles = () => {
  return api.get("/articles").then(({ data }) => {
    return data.articles;
  });
};
