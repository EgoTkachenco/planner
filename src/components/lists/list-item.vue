<template>
  <router-link :to="{ path: `/list/${id}` }" tag="div" class="list-card c-secondary my-1 p-2">
    <div class="d-flex align-items-center text-white">
      <span class="h4">{{list.title}}</span>
      <div class="prio-tasks__label" v-if="listHighPrio">
        {{ listHighPrio }}
      </div>

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
    background: #191919;
    border-radius: 5px;
    text-align: start;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .text-field:disabled {
    font-size: 1.5rem;
  }
  .prio-tasks__label {
    background: #ff5252;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: auto;  
  }
</style>
