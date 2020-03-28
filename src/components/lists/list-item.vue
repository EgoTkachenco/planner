<template>
  <router-link :to="{ path: `/list/${id}` }" tag="div" class="list-card my-2 p-2">
    <div class="d-flex align-items-center">
      <span class="h4">{{list.title}}</span>
      <v-btn class="ml-auto" fab small color="error" v-if="listHighPrio">
        {{ listHighPrio }}
      </v-btn>

    </div>
  </router-link>
</template>

<script>
  export default {
    props: ['list', 'id'],
    computed: {
      listHighPrio() {
        let highPrio = 0;
        for (let element in this.list.tasks) {
          let task = this.list.tasks[element];
          if (!task.isComplete && task.priority && task.priority.title === 'High') {
            highPrio++;
          }
        }
        return highPrio;
      },
    },
  };
</script>

<style scoped>
  .list-card {
    background: rgb(36, 35, 51);
    border-radius: 10px;
    text-align: start;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .text-field:disabled {
    font-size: 1.5rem;
  }
</style>
