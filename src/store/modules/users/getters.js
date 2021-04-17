export default {
    userId(state) {
        return state.userId;
    },
    token(state) {
        return state.token;
    },
    getUsers(state) {
        return state.users;
    },
    getActualUser(state) {
        const userId = localStorage.getItem('userId');
        for (var i= 0; i < state.users.length; i++) {
            if (state.users[i].userId === userId) {
                return state.users[i];
            }
       }
    },
    getUserById: state => id => {
        for (const key in state.users) {
            if (state.users[key].userId === id) {
                return state.users[key];
            }
       }
    },
    
}