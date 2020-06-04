<template>
  <div
    class="list-card c-secondary my-2 p-2"
    @click="setActiveList"
    :class="{ 'active': activeListId === list.id }"
  >
    <div class="d-flex align-items-center">
      <span class="h4">{{ list.title }}</span>
      <v-btn
        class="ml-auto caption"
        fab
        width="16"
        height="16"
        color="error"
        v-if="listHighPrio"
      >
        {{ listHighPrio }}
      </v-btn>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['list', 'activeListId'],
    computed: {
      listHighPrio() {
        let highPrio = 0;
        for (let element in this.list.tasks) {
          let task = this.list.tasks[element];
          if (
            !task.isCompleted &&
            task.priority &&
            task.priority.title === 'High'
          ) {
            highPrio++;
          }
        }
        return highPrio;
      },
    },
    methods: {
      setActiveList() {
        this.$emit('set-list');
      },
    },
  };
</script>

<style scoped>
  .list-card {
    text-align: start;
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;
  }
  .list-card.active {
    background: #41B883;
  }
  .text-field:disabled {
    font-size: 1.5rem;
  }
</style>
