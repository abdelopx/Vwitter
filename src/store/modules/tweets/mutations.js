  export default {
    setTweets(state,payload) {
        state.tweets = payload;
    },
    addTweet(state,payload) {
        state.tweets.unshift(payload);
    },
    deleteTweet(state,payload) {
        state.tweets.splice(payload,1);
    }
};