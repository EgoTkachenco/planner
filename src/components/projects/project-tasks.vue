<template>
  <div class="d-flex flex-column" v-if="lists">
    <div class="list-item" v-for="(list, index) in lists" :key="index">
      <span v-if="list">{{ list.title }}</span>
			<br>
      <button @click="createNewTask(index)">add Task</button>
    </div>

    <newListTask
      :show="showNewTaskDialog"
      @close="showNewTaskDialog = false"
      :id="activeListId"
      @addTask="addTask($event)"
    ></newListTask>
  </div>
</template>

<script>
  import newListTask from './new-list-task';

  export default {
    props: {
      lists: {
        required: true,
      },
    },
    data: () => ({
			showNewTaskDialog: false,
			activeListId: null
    }),
    components: {
      newListTask,
    },
    methods: {
      addTask(task) {
        this.$emit('addTask', task);
      },
      createNewTask(listId) {
        this.showNewTaskDialog = true;
        this.activeListId = listId;
      },
    },
  };
</script>
