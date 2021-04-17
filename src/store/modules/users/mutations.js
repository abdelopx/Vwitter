  export default {
    setUsers(state,payload) {
      state.users = payload;
  },
  addUser(state,payload) {
    state.users.push(payload);
},
  
};