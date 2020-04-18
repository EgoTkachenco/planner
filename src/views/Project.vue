<template>
  <div class="row">
      {{project}}
    <div class="col-4">
      <projectTasks @addTask="addTask" :lists="project.lists"></projectTasks>
    </div>

    <button class="btn btn-primary" @click="showNewListDialog = true">Add task</button>

    <projectListDialog :show="showNewListDialog" @close="showNewListDialog = false" @addList="addList($event)"></projectListDialog>
  </div>
</template>

<script>
  // dueDate
  // isComplete
  // priority
  //     color
  //     title [Low, Medium, High]
  // text
  // status [In_Process, ...]
  // assignedTo
  // discussion ?
  import projectTasks from '../components/projects/project-tasks';
  import projectListDialog from '../components/projects/new-project-list';

  export default {
    data: () => ({
      showNewListDialog: false
    }),
    components: {
      projectTasks,
      projectListDialog
    },
    computed: {
      project: {
        get() {
          return this.$store.state.projects.projects[this.$route.params.id];
        },
        set(value) {
            debugger
          this.$store.dispatch('updateProject', {
            id: this.$route.params.id,
            project: value,
          });
        },
      },
      listTasks() {
        let list = this.$store.state.todo.lists[this.$route.params.id].tasks;
        let result = {};
        for (let task in list) {
          if (list[task].isComplete === this.showComplete) {
            result[task] = list[task];
          }
        }
        return result;
      },
    },
    methods: {
      addList(list) {
        let project = Object.assign({}, this.project);
        if (project.list) {
          project.lists.push(list);
        } else {
          project.lists = [list];
        }
        this.project = project;
      },
      addTask({ listId, task }) {
          debugger
        let project = Object.assign({}, this.project);
        if (project.lists[listId].tasks) {
          project.lists[listId].tasks.push(task);
        } else {
          project.lists[listId].tasks = [task];
        }
        this.project = project;
      },
    },
  };
</script>

<style scoped></style>
