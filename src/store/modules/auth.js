import firebase from 'firebase';
let provider = new firebase.auth.GoogleAuthProvider();

// let apiUrl = 'https://intense-meadow-61425.herokuapp.com/api/'

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

        // let user = JSON.parse(localStorage.getItem('user'));
        // if(user) {
        localStorage.setItem('user', JSON.stringify({
          expirationDate: new Date().getTime() + 1000 * 60 * 60 * 24,
          name: result.user.displayName, 
          email: result.user.email, 
          img: result.user.photoURL, 
          id: result.user.uid
        }))

        commit('SET_USER', { 
					name: result.user.displayName, 
					email: result.user.email, 
					img: result.user.photoURL, 
					id: result.user.uid
        });
      })
  },

  relogUser({ commit }, user) {
    commit('SET_USER', { 
      name: user.name, 
      email: user.email, 
      img: user.img, 
      id: user.id
    });
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
  
  // signIn({ commit }, { login, password }) {
    
  // }
};

export default {
  state,
  mutations,
  actions,
};
