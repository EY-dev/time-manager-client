
function fetchAPI(url, data){
    return  fetch(url, {
        method: 'POST', // or 'PUT'
        mode: 'cors', // no-cors, *cors, same-origin
        credentials: 'include', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json()).catch((error)=>{console.log(error.message)})
}
export default {
    state: {
        user: null
    },
    mutations: {
        SET_USER_LOCAL: (state, user) => {
            localStorage.setItem("user_name", user.name);
            localStorage.setItem("user_email", user.email);
        },
        SET_USER_REMOTE: (state, user) => {
            localStorage.setItem("user_name", user.name);
            localStorage.setItem("user_email", user.email);
        },
        SET_USER:(state, user) => {
            if (user === null) {
                localStorage.removeItem("user_name");
                localStorage.removeItem("user_email");
                state.user = null
            }
            else{
                localStorage.setItem("user_name", user.name);
                localStorage.setItem("user_email", user.email);
                state.user = user
            }

        },
    },
    actions: {
        setUser : (state, user) => {
            state.commit('SET_USER', user);
            state.commit('SET_USER_LOCAL', user);
            state.commit('SET_USER_REMOTE', user);
        },
        auth: (state, data) => {
            const url = 'https://service.ey-dev.com/time-manager/auth/'
            return fetchAPI(url,{"user": {'email': data.email, 'pwd': data.pwd}})
                .then(user => {
                    if ('error' in user) {
                        throw new Error(user['error']);
                    }
                    state.commit('SET_USER', user);
                    state.commit('SET_USER_LOCAL', user);
                    state.commit('SET_USER_REMOTE', user);
                })
        },
        logout: state => {
            state.commit('SET_USER', null)
        }
    },
    getters:{
        getUser: state => {
            return state.user;
        },
        isAuth: state => {
            return state.user !== null
        }
    },
    modules: {
    }
}
