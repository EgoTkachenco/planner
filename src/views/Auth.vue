<template>
  <div class="row justify-content-center h-100-vh">
    <div class="col-12 d-flex align-items-center justify-content-center">
      <div class="auth-card w-100 p-4 py-5" v-if="!isLoading">
        <img
          src="../assets/logo-p.svg"
          alt="logo-vue"
          width="300px"
          height="100px"
        />
        <div class="h3 text-center mb-5">Sign Up / Sign In</div>
        <!-- <div class="form-group">
          <input
            type="email"
            class="form-control font-weight-bold"
            v-model="login"
            placeholder="Login"
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            class="form-control font-weight-bold"
            v-model="password"
            placeholder="Password"
          />
        </div>

        <div class="error p-1" v-if="error">{{ error }}</div>

        <button class="btn btn-primary font-weight-bold mt-5" @click="loginWithEmail">
          Sign In
        </button> -->

        <br />

        <v-btn rounded large color="primary" class="mt-md-5" @click="googleSignIn">
          Sign with Google
        </v-btn>
        <br>

      </div>
      <div class="auth-card" v-else>
        {{ loadingMessage }}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      isLoading: false,
      messageTimeout: null,
      loadingMessage: '',
      login: '',
      password: '',
      error: '',
    }),
    watch: {
      isLoading(val) {
        let index = 0;
        if (val) {
          this.messageTimeout = setInterval(() => {
            switch (index) {
              case 0: {
                this.loadingMessage = 'Loading .';
                index++;
                break;
              }
              case 1: {
                this.loadingMessage = 'Loading ..';
                index++;
                break;
              }
              case 2: {
                this.loadingMessage = 'Loading ...';
                index = 0;
                break;
              }
            }
          }, 300);
        } else {
          clearTimeout(this.messageTimeout);
        }
      },
    },
    methods: {

      Registration() {
        
      },

      loginWithEmail() {
        if (this.isFormValid(this.login, this.password)) {
          this.isLoading = true;
          this.$store
            .dispatch('signIn', { login: this.login, password: this.password })
            .then(() => {
              if (this.$store.state.auth.user) {
                this.isLoading = false;
                this.$router.push({ name: 'Home' });
              }
            })
            .catch((err) => {
              this.error = err.msg;
            });
        }
      },
      isFormValid(login, password) {
        if (login !== '' && password !== '') {
          return true;
        } else {
          return false;
        }
      },
      googleSignIn() {
        this.isLoading = true;
        this.$store.dispatch('googleSignin').then(() => {
          if (this.$store.state.auth.user) {
            this.isLoading = false;
            this.$router.push({ name: 'Home' });
          }
        });
      },
    },
  };
</script>

<style scoped>
  .auth-card {
    max-width: 350px;
    color: #fff;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    border-radius: 20px;  
  }

  .input-auth {
    border: 1px #fff;
    border-color: #fff;
    padding: 5px 10px;
  }
  .btn-login {
    background: #41B883;
    color: #fff;
    border: 0;
  }

  .btn-google {
    background: #35495E;
    color: #fff;
    border: 1px;
    border-color: #35495E;
  }

  .reg-text {
    color: rgb(180, 180, 180);
    font-size: 13px;
  }

  .btn-reg {
    background: 0;
    border: 0;
    font-size: 5px;
  }
</style>
