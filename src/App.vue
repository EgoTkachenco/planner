<template>
  <v-app id="app">
    <div class="container h-100">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </div>
  </v-app>
</template>

<script>
  import Vuetify from 'vuetify'
  export default {
    computed: {
      user() {
        return this.$store.state.auth.user;
      }
    },
    watch: {
      user(val) {
        if(val) {
          this.$store.dispatch('loadLists');
        }
      }
    },
    vuetify: new Vuetify()
  };
</script>

<style>
  #app {
    font-family: 'Baloo Chettan 2', cursive;
    text-align: center;
    color: #fff;;
    min-height: 100vh;
    background: rgb(33, 33, 47);
  }
  .success-bg {
    background: #37b86a;
  }
  .h-100-vh {
    height: 100vh;
  }
  .btn-add {
    width: 100%;
    font-size: 2rem;
    line-height: 20px;
    color: #ffffff;
  }
  input.form-control.text-field, textarea.form-control.text-field {
    background-color: #2c3e50;
    color: #fff;
    border-color: #2c3e50;
    resize:vertical;
  }
  input.form-control.text-field:disabled, textarea.form-control.text-field:disabled {
    background: none;
    color: #fff;
    border: none;
  }
  .close-btn {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 10px;
    right: 10px;
    font-size: 2rem;
    border-radius: 50%;
    line-height: 20px;
    transform: rotate(45deg);
    cursor: pointer;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
  }
  .dialog-overlay {
    position: fixed;
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
  }
  button:focus{
    outline: none;
  }
</style>

