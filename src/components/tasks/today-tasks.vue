<template>
  <div class="d-flex flex-column">
    <div class="title my-3">Tasks For Today</div>

    <div v-for="(group, index) in getTodayTasks" class="task-card" :key="index">
      <div class="d-flex flex-column text-left w-100 my-2" v-if="group.tasks.length > 0">
        <div class="subtitle px-3">{{ group.title }}</div>
        <div
          v-for="(task, index) in group.tasks"
          class="h5 px-3 py-2 my-1 w-100"
          :key="index"
					:style="{borderLeft: task.priority ? `3px solid ${task.priority.color}` : 'none' }"
        >
          {{ task.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      getTodayTasks() {
        return this.$store.state.todo.todayTasks;
      },
    },
  };
</script>

<style scoped>
  .task-card {
    background: rgb(36, 35, 51);
    display: flex;
    align-items: center;
    flex-direction: column;
  }
</style>
