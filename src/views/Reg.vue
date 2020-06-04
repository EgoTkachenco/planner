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
        <div class="h3 text-center">Sign Up</div>

        <form @submit.prevent="signUp">
          <div class="form-group">
            <input
              type="text"
              maxlength="50"
              minlength="4"
              class="form-control"
              placeholder="First Name"
              required
              v-model="form.firstName"
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              maxlength="50"
              minlength="5"
              class="form-control"
              placeholder="Last Name"
              required
              v-model="form.lastName"
            />
          </div>
          <div class="form-group">
            <input
              type="email"
              class="form-control"
              placeholder="email"
              required
              v-model="form.email"
            />
          </div>

          <div class="form-group">
            <input
              type="password"
              class="form-control"
              placeholder="Password"
              required
              v-model="form.password"
            />
          </div>
          <button class="w-100 btn btn-primary mt-5 mb-2" type="submit">
            Sign Up
          </button>
          <span v-if="error" class="h5 text-danger mb-5">{{error}}</span>
        </form>
      </div>
      <div class="auth-card">
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

      form: {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      },

      error: ''
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
      signUp() {
        debugger
        this.$store.dispatch('signUp', this.form)
          .then(res => {
            debugger
            if(res) {
              this.error = res
            }
            if (this.$store.state.auth.user) {
              this.isLoading = false;
              this.$router.push({ name: 'Home' });
            }
          })
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
    padding: 5px 10px;
  }

  .btn-google {
    background: 0;
    border-color: cornflowerblue;
  }
</style>
