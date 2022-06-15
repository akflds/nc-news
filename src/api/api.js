import axios from "axios";

const api = axios.create({
  baseURL: "https://akflds-news-api.herokuapp.com/api",
});

export const getArticles = (topic) => {
  return api.get("/articles", { params: { topic } }).then(({ data }) => {
    return data.articles;
  });
};

export const getArticle = (article_id) => {
  return api.get(`/articles/${article_id}`).then(({ data }) => {
    return data.article;
  });
};

export const getTopics = () => {
  return api.get("/topics").then(({ data }) => {
    return data.topics;
  });
};

export const updateVote = (article_id, inc_votes) => {
  return api
    .patch(`/articles/${article_id}`, { inc_votes })
    .then(({ data }) => {
      return data.article.votes;
    });
};

export const getComments = (article_id) => {
  return api.get(`/articles/${article_id}/comments`).then(({ data }) => {
    return data.comments;
  });
};
