<template>
  <div class="row justify-content-center h-100-vh">
    <div class="col-12 d-flex align-items-center justify-content-center">
      <div class="auth-card w-100 p-4 py-5" v-if="!isLoading">
        <img src="../assets/logo-p.svg" alt="logo-vue" width="300px" height="100px">
        <div class="h3 text-center">Sign Up / Sign In</div>

        <form action="" class="col-12">
          <div class="form-group">
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Login">
            <small id="emailHelp" class="form-text text-muted">We'll never share your login with anyone else.</small>
          </div>
          
           <div class="form-group">
            <input type="password" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Password">
            <small id="emailHelp" class="form-text text-muted">We'll never share your Password with anyone else.</small>
          </div>
        </form>

        <div class="h5 text-center"></div>

        <button class="btn btn-primary mt-5" @click="loginWithEmail">
          Login
        </button>

        <br>

        <button class="btn btn-primary btn-google mt-5" @click="googleSignIn">
          Sign with Google
        </button>
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

  .btn-google {
    background: 0;
    border-color:cornflowerblue;
      }
</style>
