import axios from '../axios'

function token() {
  let t = null;
  const user = JSON.parse(localStorage.getItem("user"))
  if(user) {
    t = user.token
  }
  return t
}

let state = {
  lists: null,
  activeList: null,
  todayTasks: null,
  todayPlan: null,
};

let mutations = {
  SET_LISTS(state, payload) {
    state.lists = payload
  },
  SET_ACTIVE_LIST(state, payload) {
    state.activeList = payload;
  },
  SET_TODAY_TASKS(state, payload) {
    state.todayTasks = payload;
  },
  DEF_MUT(state) {
    if (state) {
      return;
    }
  },
};

let actions = {
  loadLists({ commit }) {
    return axios.get('/lists', { headers: {'x-auth-token': token()}})
			.then(res => {
				commit('SET_LISTS', res.data);
			})
			.catch(error => {
        return error.response.data
      });
  },
  getTasksForToday({commit}) {
    return axios.post('/tasks/tasksForDate', { time: new Date().getTime() }, { headers: {'x-auth-token': token()}})
			.then(res => {
				commit('SET_TODAY_TASKS', res.data);
			})
			.catch(error => {
        return error.response.data
      });
  },
  addList({ dispatch }, list) {
    return axios.post('/lists', list, { headers: {'x-auth-token': token()}})
			.then(() => {
				dispatch('loadLists');
			})
			.catch(error => {
        return error.response.data
      });
  },
   loadTasks({commit}, listId) {
    commit('SET_ACTIVE_LIST', null)
    return axios.post('/lists/tasklist', {listId}, { headers: {'x-auth-token': token()}})
    .then(res => {
      commit('SET_ACTIVE_LIST', res.data)
    })
    .catch(error => {
      return error.response.data
    });
  },
  editList({ dispatch }, { list, id }) {
    return axios.put(`/lists/${id}`, list, { headers: {'x-auth-token': token()}})
    .then(() => {
      dispatch('loadLists');
    })
    .catch(error => {
      return error.response.data
    });
  },
  removeList({ dispatch }, id) {
    return axios.delete(`/lists/${id}`, { headers: {'x-auth-token': token()}})
    .then(() => {
      dispatch('loadLists');
    })
    .catch(error => {
      return error.response.data
    });
  },
  addTask({ dispatch }, task) {
    return axios.post('/tasks', task, { headers: {'x-auth-token': token()}})
			.then(() => {
				dispatch('loadTasks', task.listId);
			})
			.catch(error => {
        return error.response.data
      });
  },
  editTask({ dispatch }, { task, id }) {
    return axios.put(`/tasks/${id}`, task, { headers: {'x-auth-token': token()}})
			.then(() => {
				dispatch('loadTasks', state.activeList.id);
			})
			.catch(error => {
        return error.response.data
      });
  },
  removeTask({ state, dispatch }, id) {
    return axios.delete(`/tasks/${id}`, { headers: {'x-auth-token': token()}})
			.then(() => {
				dispatch('loadTasks', state.activeList.id);
			})
			.catch(error => {
        return error.response.data
      });
  },
  // savePlan({ commit }, plan) {
  //   database
  //     .child('todayPlan')
  //     .transaction(() => {
  //       return plan;
  //     });
  //   commit('DEF_MUT');
  // },
};

export default {
  state,
  mutations,
  actions,
};
