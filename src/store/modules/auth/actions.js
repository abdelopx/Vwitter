export default {
    async signin(context,payload) {
        return context.dispatch('auth',{
            ...payload,
            mode: 'signin',
        });
    },
    async signup(context,payload) {
        return context.dispatch('auth',{
            ...payload,
            mode: 'signup',
        });
    },

    async auth(context,payload) {
        const mode = payload.mode;
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+process.env.API_KEY;

        if(mode === 'signup') {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+process.env.API_KEY;
        }
        const response = await fetch(url,{
            method: 'POST',
            body: JSON.stringify({ 
                email: payload.email,
                password: payload.password,
                returnSecureToken: true,
            }),
        });

        if(!response.ok) {
            const error = new Error('An error occured.');
            throw error;
        }


        const responseData = await response.json();
        
        localStorage.setItem('token',responseData.idToken);
        localStorage.setItem('userId',responseData.localId);

        context.commit('setUser',{
            token: responseData.idToken,
            userId: responseData.localId,
            tokenExpiration: responseData.expiresIn,
        });
        if(mode === 'signup') {
        context.dispatch('users/addUser', payload, { root: true });
        }
    },

    autoLogin(context) {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');

        if (token && userId) {
            context.commit('setUser',{
                token: token,
                userId: userId,
                tokenExpiration: null,
            }); 
        } 

    },


    

}