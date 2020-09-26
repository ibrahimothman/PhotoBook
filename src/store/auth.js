import { Auth } from 'aws-amplify';

const state = {
    user: null,
}

const mutations = {
    setUser(state, payload) { state.user = payload; },
}

const actions = {
    async signOut({ commit }) {
        commit('setUser', null);
        return await Auth.signOut();
    },

    async signIn({ commit }, { username, password }) {
        try {
            await Auth.signIn(username, password);
            const userInfo = await Auth.currentUserInfo();
            commit('setUser', userInfo);
            return Promise.resolve('success');
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    },

    async signUp(_, { username, password, email }) {
        try {
            await Auth.signUp({
                username,
                password,
                attributes: {
                    email,
                }
            });
            return Promise.resolve();
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    },

    async confirmSignUp(_,{ username, code }) {
        try {
            await Auth.confirmSignUp(username, code);
            return Promise.resolve();
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    },

    async initAuthStatus({ commit }) {
        const userInfo = await Auth.currentUserInfo();
        commit('setUser', userInfo);
    },
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
}