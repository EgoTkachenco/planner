<template>
  <div
    class="task-card px-3 py-2 my-2"
    :class="{ completed: task.isComplete, 'active': isActive }"
    :style="{ borderLeft: task.priority ? `3px solid ${getColor(task.priority)}` : 'none' }"
    @click="setActiveTask"
  >
    <div class="d-flex align-items-center w-100">
      <div class="w-100">
        <textarea
          class="form-control text-field text-left" 
          v-model="task.text"
          @keydown.enter="rows++"
          :rows="!isEdit ? 1 : 3"
          type="text"
          :disabled="!isEdit"
        ></textarea>
        <div v-if="!isEdit && task.dueDate" class="text-left">{{new Date(task.dueDate).toLocaleString().slice(0, 10)}}</div>
      </div>

      <div class="d-flex ml-auto mt-2 cursor-p" v-if="isActive && !isEdit">
        <div @click.stop="complete" v-if="!task.isComplete" class="mx-2">
          <img src="../../assets/svg/done.svg" width="25" alt="done" />
        </div>
        <div @click.stop="start" v-else-if="task.isComplete" class="mx-2">
          <img src="../../assets/svg/done.svg" width="25" alt="done" />
        </div>
        <div @click.stop="isEdit = true" class="mx-2">
          <img src="../../assets/svg/edit.svg" width="25" alt="done" />
        </div>
        <div @click="removeTask" class="mx-2">
          <img src="../../assets/svg/remove.svg" width="25" alt="done" />
        </div>
      </div>
    </div>

    <div class="ml-auto d-flex mt-2" v-if="isEdit">
      <v-menu offset-y dark>
        <template v-slot:activator="{ on }">
          <v-btn text dark small v-on="on">
            Priority
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in colors"
            :key="index"
            @click="task.priority = index+1"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn dark small text @click="changeDueDate">Due Date</v-btn>
      <v-btn small color="success" class="mx-2" @click.stop="editTask">
        Save
      </v-btn>
    </div>

     <div class="dialog-overlay flex-column" v-if="showDatePicker">
        <v-date-picker dark v-model="picker"></v-date-picker>
        <v-btn text dark class="mt-2" v-if="picker" @click="saveDate">Save</v-btn>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['task', 'isActive'],
    data: () => ({
      isEdit: false,
      showDatePicker: false,
      picker: null,
      rows: 1,
      colors: [
        { title: 'Low', color: '#76FF03' },
        { title: 'Medium', color: '#FF9800' },
        { title: 'High', color: '#F44336' },
      ],
    }),
    methods: {
      getColor(prio) {
        switch (prio) {
          case 3:
            return '#F44336'
          case 2:
            return '#FF9800'
          case 1:
            return '#76FF03'
          default:
            break;
        }
      },
      editTask() {
        this.$store.dispatch('editTask', {
          task: this.task,
          id: this.task._id,
        });
        let socket = this.$store.state.projects.socket;
        if(socket) socket.emit('update-list', this.$store.state.todo.activeList.id)
        this.isEdit = false;
        this.rows = 1;
      },
      changeDueDate() {
        this.picker = null;
        this.showDatePicker = true;
      },
      removeTask() {
        this.$store.dispatch('removeTask', this.task._id);
        let socket = this.$store.state.projects.socket;
        if(socket) socket.emit('update-list', this.$store.state.todo.activeList.id)
      },
      complete() {
        this.task.isCompleted = true;
        this.editTask();
      },
      start() {
        this.task.isCompleted = false;
        this.editTask();
      },
      saveDate() {
        this.task.dueDate = this.picker;
        this.showDatePicker = false;
        this.picker = null;
      },
      setActiveTask() {
        this.$emit('set-active-task');
      }
    },
  };
</script>

<style scoped>
  .cursor-p div {
    cursor: pointer;
  }
  .task-card {
    background: rgb(36, 35, 51);
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .task-card.active {
    background: #41B883;
  }
  .completed .text-field {
    text-decoration: line-through;
    color: grey;
    min-height: 42px;
  }
  .text-field {
    min-height: 42px;
    line-height: 30px;
  }
</style>
