import axios from "axios";

const fetchTweets = (params) => {
  console.log("params => ", params);
  return axios.get("http://localhost:4440/tweets", { params });
};

const postTweet = (data) => {
  return axios.post("http://localhost:4440/tweets", {
    ...data,
  });
};

// { id_twet : , is_user: }
const likeTweet = (data) => {
  return axios.post("http://localhost:4440/likeHistory", data);
};

const getLikeCount = () => {
  return axios.get("http://localhost:4440/likeHistory", {});
};

const deleteLikeCount = (params) => {
  return axios.delete("http://localhost:4440/likeHistory", {
    params: {
      id_tweet: params.id_tweet,
      id_user: params.id_user,
    },
  });
};

export default {
  fetchTweets,
  postTweet,
  likeTweet,
  getLikeCount,
  deleteLikeCount,
};
