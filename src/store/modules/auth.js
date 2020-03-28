import firebase from 'firebase';
let provider = new firebase.auth.GoogleAuthProvider();

let state = {
  user: null,
};

let mutations = {
  SET_USER(state, payload) {
    state.user = payload;
  },
};

let actions = {
  async googleSignin({ commit }) {
    await firebase
      .auth()

      .signInWithPopup(provider)
      .then(function(result) {
        commit('SET_USER', { 
					name: result.user.displayName, 
					email: result.user.email, 
					img: result.user.photoURL, 
					id: result.user.uid
        });
      })
  },

  googleSignout({ commit }) {
    firebase
      .auth()
      .signOut()
      .then(
        function() {
          commit('SET_USER', null);
        },
      );
	},
};

export default {
  state,
  mutations,
  actions,
};
