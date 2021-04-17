export default {
    async addTweet(context,payload) {
        const userId = context.rootGetters['auth/userId'];
        const newTweet = {
            content: payload.content,
            date: payload.date,
            liked: payload.liked,
            userId: userId,
        };
    
        const response = await fetch(process.env.DB_URL+'/tweets.json',{
            method: 'POST',
            body: JSON.stringify(newTweet),
        });

        if (!response.ok) {
            const error = new Error ('Failed to add the tweet');
            throw error;
        }

        const responseData = await response.json();
        newTweet.id = responseData.name;
        
        context.commit('addTweet',newTweet);
    },

    async fetchTweets(context) {
        const response = await fetch(process.env.DB_URL+'/tweets.json');

        if(!response.ok) {
            const error = new Error('Could not fetch tweets');
            throw error;
        }

        const responseData = await response.json();
        const tweets = [];

        for (const key in responseData) {
            const tweet = {
                id: key,
                content: responseData[key].content,
                date: responseData[key].date,
                liked: responseData[key].liked,
                userId:responseData[key].userId
            };
            tweets.unshift(tweet);
        }
        context.commit('setTweets',tweets);
    },
    
    async deleteTweet(context,tweetId) {
        let url = process.env.DB_URL+`/tweets/${tweetId}.json`
        const response = await fetch(url,{
            method: 'DELETE',
        });

        if (!response.ok) {
            const error = new Error ('Could not delete the tweet.');
            throw error;
        }
        
        const index = context.state.tweets.findIndex(tweet => tweet.id === tweetId);
        context.commit('deleteTweet',index);
    },

    async likeButton(context,payload) {
        const tweetId = payload.id;
        const bodyToSend = {
            liked: !payload.liked,
        };
        const tweetReplace = {
            ...payload,
            liked: !payload.liked,
        };
        const indexOfTweet = context.state.tweets.findIndex(tweet => tweet.id === tweetId);
        context.state.tweets[indexOfTweet] = tweetReplace;

        const response = await fetch(process.env.DB_URL+`/tweets/${tweetId}.json`,{
            method: 'PATCH',
            body: JSON.stringify(bodyToSend),
        });

    },
}