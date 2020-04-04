<template>
  <div class="row justify-content-center h-100-vh">
    <div class="col-12 d-flex align-items-center justify-content-center">
      <div class="auth-card w-100 p-4 py-5" v-if="!isLoading">
        <div class="h3 text-center">SignUp / SignIn</div>
        <div class="h5 text-center">with Google</div>

        <button class="btn btn-primary mt-5" @click="googleSignIn">
          Soska
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
    color: rgba(255, 255, 255, 0.75);
    border-radius: 20px;
  }
</style>
