import firebase from 'firebase';

let database = null;

function getTodayTasks(lists) {
  let today = new Date().toISOString().slice(0, 10);
  let result = [];
  for (const list in lists) {
    let group = { title: lists[list].title, tasks: [] };
    for (const task in lists[list].tasks) {
      let taskItem = lists[list].tasks[task];
      if (
        !taskItem.isComplete &&
        taskItem.dueDate &&
        taskItem.dueDate === today
      ) {
        group.tasks.push(taskItem);
      }
    }
    result.push(group);
  }
  return result;
}

let state = {
  lists: null,
  todayTasks: null,
  todayPlan: null,
};

let mutations = {
  SET_LISTS(state, payload) {
    state.lists = payload.lists;
    let todayTasks = getTodayTasks(payload.lists);
    state.todayTasks = todayTasks;
    state.todayPlan =
      payload.todayPlan &&
      payload.todayPlan.date === new Date().toISOString().slice(0, 10)
        ? payload.todayPlan
        : null;
  },
  DEF_MUT(state) {
    if (state) {
      return;
    }
  },
};

let actions = {
  loadLists({ commit }) {
    database = firebase.database().ref(this.state.auth.user.id);
    database.on('value', snapshot => {
      commit('SET_LISTS', snapshot.val());
    });
    commit('DEF_MUT');
  },
  addList({ commit }, list) {
    database.child('lists').push(list);
    commit('DEF_MUT');
  },
  editList({ commit }, { list, id }) {
    database
      .child('lists')
      .child(id)
      .transaction(() => {
        return list;
      });
    commit('DEF_MUT');
  },
  removeList({ commit }, id) {
    database
      .child('lists')
      .child(id)
      .remove();
    commit('DEF_MUT');
  },
  addTask({ commit }, { task, listId }) {
    database
      .child('lists')
      .child(listId)
      .child('tasks')
      .push(task);
    commit('DEF_MUT');
  },
  editTask({ commit }, { task, taskId, listId }) {
    database
      .child('lists')
      .child(listId)
      .child('tasks')
      .child(taskId)
      .transaction(() => {
        return task;
      });
    commit('DEF_MUT');
  },
  removeTask({ commit }, { taskId, listId }) {
    database
      .child('lists')
      .child(listId)
      .child('tasks')
      .child(taskId)
      .remove();
    commit('DEF_MUT');
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
