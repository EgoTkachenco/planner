<template>
  <div class="row justify-content-center h-100-vh">
    <div class="col-12 d-flex align-items-center justify-content-center">
      <div class="auth-card w-100 p-4 py-5" v-if="!isLoading">
        <img src="../assets/logo-p.svg" alt="logo-vue" width="300px" height="100px">
        <div class="h3 text-center">Sign Up / Sign In</div>

        <form action="" class="col-12">
          <div class="form-group">
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Login">
          </div>
          
           <div class="form-group my-0">
            <input type="password" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Password">
            <small id="emailHelp" class="form-text text-muted mt-1">We will never share your data with anyone else. *</small>
          </div>
        </form>


        <button class="btn btn-login btn-secondary py-2 my-2 mx-3 col-11 btn-block" @click="loginWithEmail">
          Login
        </button>

        <button class="btn py-2 px-5 btn-google mt-1 btn-sm col-11 btn-12 " @click="googleSignIn">
          Login with Google
        </button>

        <div class="h5 text-center mt-5 reg-text">If you do not have an account, you can register it</div>

        <button class="btn  mt-0  btn-link" @click="Registration" v-li>
        <a href="Reg.vue">
          Registration
        </a>
        </button>
        <br>

      </div>
      <div class="auth-card">
        {{loadingMessage}}
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
    /* background: rgb(36,35,51); */
    color: #fff;
    border-radius: 20px;  
  }

  .input-auth {
    border: 1px #fff;
    border-color: #fff;
    padding: 5px  10px;
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
