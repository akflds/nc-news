import axios from "axios";

const api = axios.create({
  baseURL: "https://akflds-news-api.herokuapp.com/api",
});

export const getArticles = (topic, sort_by, order) => {
  return api
    .get("/articles", { params: { topic, sort_by, order } })
    .then(({ data }) => {
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

export const updateVote = (target, id, inc_votes) => {
  return api.patch(`/${target}/${id}`, { inc_votes }).then(({ data }) => {
    // handles key being singlular (e.g. "article")
    return data[target.slice(0, -1)].votes;
  });
};

export const getComments = (article_id, p) => {
  return api
    .get(`/articles/${article_id}/comments`, { params: { p, limit: 5 } })
    .then(({ data }) => {
      return data.comments;
    });
};

export const postComment = (article_id, username, body) => {
  return api
    .post(`/articles/${article_id}/comments`, {
      username,
      body,
    })
    .then(({ data }) => {
      return data.comment;
    });
};

export const deleteComment = (comment_id) => {
  return api.delete(`/comments/${comment_id}`).then((data) => {
    return data.status;
  });
};
