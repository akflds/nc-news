import axios from "axios";

const api = axios.create({
  baseURL: "https://akflds-news-api.herokuapp.com/api",
});

export const getArticles = (topic) => {
  return api
    .get("/articles", { params: { topic } })
    .then(({ data }) => {
      return data.articles;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getArticle = (article_id) => {
  return api
    .get(`/articles/${article_id}`)
    .then(({ data }) => {
      return data.article;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getTopics = () => {
  return api
    .get("/topics")
    .then(({ data }) => {
      return data.topics;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const updateVote = (article_id, inc_votes) => {
  return api
    .patch(`/articles/${article_id}`, { inc_votes })
    .then(({ data }) => {
      return data.article.votes;
    })
    .catch((error) => {
      console.log(error);
    });
};
