import axios from '../axios'
let database = null;

let token = null;
const user = JSON.parse(localStorage.getItem("user"))
if(user) {
  token = user.token
}
// function getTodayTasks(lists) {
//   let today = new Date().toISOString().slice(0, 10);
//   let result = [];
//   for (const list in lists) {
//     let group = { title: lists[list].title, tasks: [] };
//     for (const task in lists[list].tasks) {
//       let taskItem = lists[list].tasks[task];
//       if (
//         !taskItem.isComplete &&
//         taskItem.dueDate &&
//         taskItem.dueDate === today
//       ) {
//         group.tasks.push(taskItem);
//       }
//     }
//     result.push(group);
//   }
//   return result;
// }

let state = {
  lists: null,
  activeList: null,
  todayTasks: null,
  todayPlan: null,
};

let mutations = {
  SET_LISTS(state, payload) {
    state.lists = payload
    // .lists;
    // let todayTasks = getTodayTasks(payload.lists);
    // state.todayTasks = todayTasks;
    // state.todayPlan =
    //   payload.todayPlan &&
    //   payload.todayPlan.date === new Date().toISOString().slice(0, 10)
    //     ? payload.todayPlan
    //     : null;
  },
  SET_ACTIVE_LIST(state, payload) {
    state.activeList = payload;
  },
  DEF_MUT(state) {
    if (state) {
      return;
    }
  },
};

let actions = {
  loadLists({ commit }) {
    return axios.get('/lists', { headers: {'x-auth-token': token}})
			.then(res => {
				commit('SET_LISTS', res.data);
			})
			.catch(error => {
        return error.response.data
      });
  },
  addList({ dispatch }, list) {
    return axios.post('/lists', list, { headers: {'x-auth-token': token}})
			.then(res => {
        console.log(res)
				dispatch('loadLists');
			})
			.catch(error => {
        return error.response.data
      });
  },
  loadTasks({commit}, listId) {
    return axios.post('/lists/tasklist', {listId}, { headers: {'x-auth-token': token}})
    .then(res => {
      commit('SET_ACTIVE_LIST', res.data)
    })
    .catch(error => {
      return error.response.data
    });
  },
  editList({ dispatch }, { list, id }) {
    return axios.put(`/lists/${id}`, list, { headers: {'x-auth-token': token}})
    .then(res => {
      console.log(res)
      dispatch('loadLists');
    })
    .catch(error => {
      return error.response.data
    });
  },
  removeList({ dispatch }, id) {
    return axios.delete(`/lists/${id}`, { headers: {'x-auth-token': token}})
    .then(res => {
      console.log(res)
      dispatch('loadLists');
    })
    .catch(error => {
      return error.response.data
    });
  },
  addTask({ dispatch }, task) {
    return axios.post('/tasks', task, { headers: {'x-auth-token': token}})
			.then(() => {
				dispatch('loadTasks', task.listId);
			})
			.catch(error => {
        return error.response.data
      });
  },
  editTask({ dispatch }, { task, id }) {
    debugger
    return axios.put(`/tasks/${id}`, task, { headers: {'x-auth-token': token}})
			.then(() => {
				dispatch('loadTasks');
			})
			.catch(error => {
        return error.response.data
      });
  },
  removeTask({ state, dispatch }, id) {
    return axios.delete(`/tasks/${id}`, { headers: {'x-auth-token': token}})
			.then(() => {
				dispatch('loadTasks', state.activeList.id);
			})
			.catch(error => {
        return error.response.data
      });
  },
  savePlan({ commit }, plan) {
    database
      .child('todayPlan')
      .transaction(() => {
        return plan;
      });
    commit('DEF_MUT');
  },
};

export default {
  state,
  mutations,
  actions,
};
