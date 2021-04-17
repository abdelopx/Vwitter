export default {
    async addUser(context,payload) {
        const userId = context.rootGetters['auth/userId'];


        const newUser = {
            email: payload.email,
            name: payload.name,
            twitterTag: payload.twitterTag,
            profilePicture: payload.profilePicture,
            userId: userId,
        };
    
        const response = await fetch(process.env.DB_URL+'/users.json',{
            method: 'POST',
            body: JSON.stringify(newUser),
        });
        context.dispatch('fetchUsers',{register: true});

        if (!response.ok) {
            const error = new Error ('Failed to add the tweet');
            throw error;
        }
        
        context.commit('addUser',newUser);
    },
    async fetchUsers(context,payload) {
        const users = localStorage.getItem('users');
        if (users && !payload) {
            context.commit('setUsers',JSON.parse(users));
        }

        else {
        const response = await fetch(process.env.DB_URL+'/users.json');

        if (!response.ok) {
            response.message = "Could not fetch the data, Please try again later...";
            const error = new Error(response.message);
            throw error;
        }

        const responseData = await response.json();

        const users = [];
            for (const key in responseData) {
                const user = {
                    userId: responseData[key].userId,
                    name: responseData[key].name,
                    twitterTag: responseData[key].twitterTag,
                    email: responseData[key].email,
                    profilePicture: responseData[key].profilePicture,
                };
                users.push(user);
            }
            localStorage.setItem('users',JSON.stringify(users));
            context.commit('setUsers',users);
        }
    },
    getUserById(context,id) {
         context.getters['getUserById'];
    }
}