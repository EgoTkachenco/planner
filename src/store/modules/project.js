import axios from '../axios'
import io from 'socket.io-client'


function token() {
  let t = null;
  const user = JSON.parse(localStorage.getItem("user"))
  if(user) {
    t = user.token
  }
  return t
}

let state = {
  projects: null,
  activeProject: null,
  lists: null,
  socket: null,
  activeListId: null
};

let mutations = {
  SET_PROJECTS(state, payload) {
    state.projects = payload;
  },
  SET_ACTIVE_PROJECT(state, payload) {
    state.activeProject = payload;
  },
  SET_ACTIVE_LISTS(state, payload) {
    state.lists = payload
  },
  SET_ACTIVE_PROJECT_LIST(state, payload) {
    state.activeListId = payload
  },
  SET_SOCKET(state, payload) {
    state.socket = payload;
  },
  DEF_MUT(state) {
    if (state) {
      return;
    }
  },
};

let actions = {
  joinSocketRoom({state, commit, dispatch}, id) {
    let socket = io('http://localhost:3000');
    socket.on('joined',function() {
      console.log('socket connected')
    });
    socket.on('updated-lists',function() {
      dispatch('loadProjectLists', state.activeProject._id);
      console.log('Lists was updated')
    });
    socket.on('updated-list',function(listId) {
      debugger
      if(state.activeListId === listId) {
        dispatch('loadTasks', listId);
        console.log('List was updated ', listId)
      }
    });
    
    socket.emit('connect-room', id)
    commit('SET_SOCKET', socket);
  },
  inviteUser({ dispatch }, { email }) {
    return axios.post(`/projects/${state.activeProject._id}/invite`, { email }, { headers: {'x-auth-token': token()}})
      .then(() => {
        dispatch('loadProjects');
      })
      .catch(error => {
        return error.response.data
      });
  },
  loadProjects({ commit }) {
    return axios.get('/projects', { headers: {'x-auth-token': token()}})
			.then(res => {
				commit('SET_PROJECTS', res.data);
			})
			.catch(error => {
        return error.response.data
      });
  },
  addProject({ dispatch }, project) {
    return axios.post(`/projects`, project, { headers: {'x-auth-token': token()}})
			.then(() => {
				dispatch('loadProjects');
			})
			.catch(error => {
        return error.response.data
      });
  },
  loadProjectLists({ state, commit }, id) {
    let projects = state.projects;
    for (const key in projects) {
      const project = projects[key];
      if(project._id === id) {
        commit('SET_ACTIVE_PROJECT', project);
      }
    }

    return axios.get(`/projects/lists/${id}`, { headers: {'x-auth-token': token()}})
			.then(res => {
				commit('SET_ACTIVE_LISTS', res.data);
			})
			.catch(error => {
        return error.response.data
      });
  },
  addProjectList({ state }, list) {
    return axios.post(`/projects/${state.activeProject._id}/list`, list, { headers: {'x-auth-token': token()}})
			.then(() => {
				state.socket.emit('update-lists')
			})
			.catch(error => {
        return error.response.data
      });
  },
  editProjectList({ state }, { list, id }) {
    return axios.put(`/lists/${id}`, list, { headers: {'x-auth-token': token()}})
    .then(() => {
      state.socket.emit('update-lists')
    })
    .catch(error => {
      return error.response.data
    });
  },
  removeProjectList({ state }, id) {
    return axios.delete(`/lists/${id}`, { headers: {'x-auth-token': token()}})
    .then(() => {
      state.socket.emit('update-lists')
    })
    .catch(error => {
      return error.response.data
    });
  },
  updateProject({ commit }, { id, project }) {
    return axios.post(`/projects/lists`, id, project, { headers: {'x-auth-token': token()}})
			.then(res => {
				commit('SET_ACTIVE_LISTS', res.data);
			})
			.catch(error => {
        return error.response.data
      });
  },
};

export default {
  state,
  mutations,
  actions,
};
