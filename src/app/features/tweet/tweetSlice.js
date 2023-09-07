import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import tweetApi from "./../../../api/tweet";

export const fetchTweets = createAsyncThunk(
  "tweet/fetchTweetsStatus",
  async (params) => {
    const response = await tweetApi.fetchTweets(params);
    console.log("response => ", response);
    return response.data;
  }
);

export const postTweet = createAsyncThunk(
  "tweet/postTweetStatus",
  async (data) => {
    const response = await tweetApi.postTweet(data);
    return response.data;
  }
);

export const likeTweet = createAsyncThunk(
  "tweet/likeTweetStatus",
  async (data) => {
    const response = await tweetApi.likeTweet(data);
    return response.data;
  }
);

export const getLikeCount = createAsyncThunk(
  "tweet/getLikeCountStatus",
  async () => {
    const response = await tweetApi.getLikeCount();
    return response.data;
  }
);

export const deleteLikeCount = createAsyncThunk(
  "tweet/deleteLikeCountStatus",
  async (params) => {
    const response = await tweetApi.getLikeCount(params);
    return response.data;
  }
);

const initialState = {
  tweetList: [],
};

export const tweetSlice = createSlice({
  name: "tweet",
  initialState,
  reducers: {
    getTweets: () => {},
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTweets.fulfilled, (state, action) => {
      state.tweetList = action.payload;
    });
    builder.addCase(postTweet.fulfilled, () => {
      // redirect
      fetchTweets();
    });
    builder.addCase(likeTweet.fulfilled, () => {
      //
    });
    builder.addCase(getLikeCount.fulfilled, (state, action) => {
      state.tweetList = state.tweetList.map((item) => {
        return {
          like:
            action.payload.filter((item2) => item2.id_tweet == item.id)
              .length || 0,
          ...item,
        };
      });
    });
    builder.addCase(deleteLikeCount.fulfilled, () => {});
  },
});

export default tweetSlice.reducer;
