import { createStore } from 'vuex';
import tweetsModule from './modules/tweets/index.js';
import authModule from './modules/auth/index.js';
import usersModule from './modules/users/index.js';


const store = createStore({
    modules: {
        tweets: tweetsModule,
        auth: authModule,
        users: usersModule,
    },
});


export default store;