import firebase from 'firebase';

let database = null;

let state = {
  projects: null,
};

let mutations = {
  SET_PROJECTS(state, payload) {
    state.projects = payload.projects;
  },
  DEF_MUT(state) {
    if (state) {
      return;
    }
  },
};

let actions = {
  loadProjects({ commit }) {
    database = firebase.database().ref(this.state.auth.user.id);
    database.on('value', snapshot => {
      commit('SET_PROJECTS', snapshot.val());
    });
    commit('DEF_MUT');
  },
  addProject({ commit }, project) {
    database.child('projects').push(project);
    commit('DEF_MUT');
  }
};

export default {
  state,
  mutations,
  actions,
};
