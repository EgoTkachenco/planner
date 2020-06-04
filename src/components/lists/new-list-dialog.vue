<template>
  <div class="dialog-overlay" v-if="show">
    <div class="dialog-card p-3 mx-1">
      <div class="close-btn" @click="close">+</div>

      <div class="h3 text-center">New List</div>

      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control text-field"
          id="title"
          autocomplete="off"
          placeholder="Title"
          v-model="newList.title"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input
          type="text"
          class="form-control text-field"
          id="description"
          placeholder="Description"
          v-model="newList.description"
        />
      </div>
      
      <span v-if="error" class="h4 text-danger mb-5">{{error}}</span>

      <button type="button" @click="addList" class="btn success-bg  btn-add">
        +
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['show'],
    data: () => ({
      newList: {
        title: '',
        description: '',
      },
      error: ''
    }),
    methods: {
      addList() {
        this.$store.dispatch('addList', this.newList)
          .then(res => {
            if(res) {
              this.error = res;
            } else {
              this.close();
            }
          });
      },
      close() {
        this.newList = {
          title: '',
          description: '',
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
