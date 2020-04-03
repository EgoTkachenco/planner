<template>
  <div class="dialog-overlay" v-if="show">
    <div class="dialog-card p-3 mx-1">
      <div class="close-btn" @click="close">+</div>

      <div class="h3 text-center">New Project</div>

      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control text-field"
          id="title"
          autocomplete="off"
          placeholder="Title"
          v-model="newProject.title"
        />
      </div>

      <button type="button" @click="addProject" class="btn success-bg  btn-add">
        +
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['show'],
    data: () => ({
      newProject: {
        title: '',
      },
    }),
    methods: {
      addProject() {
        this.$store.dispatch('addProject', this.newProject);
        this.close();
      },
      close() {
        this.newProject = {
          title: '',
        };
        this.$emit('close');
      },
    },
  };
</script>

<style scoped>
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
  }
  .dialog-card {
    color: #fff;
    width: 100%;
    max-width: 400px;
    background: rgb(36, 35, 51);
    border-radius: 10px;
    position: relative;
  }
</style>
