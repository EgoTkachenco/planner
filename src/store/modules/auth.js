import axios from '../axios'

let state = {
  user: null,
  token: null
};

let mutations = {
  SET_USER(state, payload) {
    state.user = payload;
  },
  LOG_IN_USER(state, payload) {
    state.token = payload;
    let user = {token: payload, expirationDate: new Date().getTime() + 1000*60*60*24 }
		localStorage.setItem('user', JSON.stringify(user));
  }
};

let actions = {
  async relogUser({ commit, dispatch }, token) {
    commit('LOG_IN_USER', token);
    await dispatch('getMe');
  },

  signIn({ commit, dispatch }, { email, password }) {
    return axios.post('/auth', { email, password })
			.then(async res => {
				commit('LOG_IN_USER', res.data);
				await dispatch('getMe');
			})
			.catch(error => {
        return error.response.data
      });
  },
  signUp({ dispatch }, form) {
    return axios.post('/users', form)
			.then(() => {
        dispatch('signIn', { login: form.email, password: form.password})
			})
			.catch(error => {
        return error.response.data
      });
  },
  getMe({state, commit}) {
    if(state.token) {
      return axios.get('/users/me', { headers: {'x-auth-token': state.token}})
      .then(res => {
        commit('SET_USER', res.data);
        return res.data._id;
      })
    }
  }
};

export default {
  state,
  mutations,
  actions,
};
