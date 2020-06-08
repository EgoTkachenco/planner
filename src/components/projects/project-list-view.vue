<template>
  <div class="row text-white">
    <div class="col-12 pt-0">
      <div class="view-card" v-if="list">
        <div class="d-flex align-items-center">
          <div>
            <div class="h4 mb-0 text-left"><b>{{ list.title }}</b></div>
            <div class="text-muted">{{list.description}}</div>
          </div>
          <div class="ml-auto">
            <v-btn @click="showTaskDialog = true" dark text>
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-btn @click="showCalendar = true" dark text>calendar</v-btn>
            <v-btn @click="startEdit" dark text>edit list</v-btn>
            <v-btn @click="removeList" dark text>remove list</v-btn>
						<v-btn dark text @click="showComplete = !showComplete">
              {{ showComplete ? 'Show Incomplete Tasks' : 'Show History' }}
            </v-btn>
          </div>
        </div>
      </div>
      <task-item
        v-for="(item, index) in listTasks"
        :key="index"
        @set-active-task="activeTask === index ? activeTask = null : activeTask = index"
        :task="item"
        :isActive="activeTask === index"
      ></task-item>
    </div>

    <task-add-dialog
      :show="showTaskDialog"
      :id="list.id"
      @close="showTaskDialog = false"
    ></task-add-dialog>

    <div
      v-if="showMenuDialog"
      class="dialog-overlay"
      @click="showMenuDialog = false"
    >
      <div class="menu-card mx-5">
        <v-btn @click="showTaskDialog = true" large dark text
          >add new task</v-btn
        >
        <v-btn dark text @click="showComplete = !showComplete">
          {{ showComplete ? 'Show Incomplete Tasks' : 'Show History' }}
        </v-btn>
        <v-btn @click="startEdit" large dark text>edit list</v-btn>
        <v-btn @click="removeList" large dark text>remove list</v-btn>
      </div>
    </div>

		<calendarDialog :tasks="listTasks" :show="showCalendar" @close="showCalendar = false"></calendarDialog>

    <div v-if="isEditList" class="dialog-overlay" @click="isEditList = false">
      <div class="menu-card mx-5 p-3" @click.stop>
        <div class="text">Edit List</div>
        <input
          v-model="editedList.title"
          class="form-control text-field mt-3"
          placeholder="Title"
        />

        <textarea
          v-model="editedList.description"
          class="form-control text-field my-3"
          placeholder="Description"
        ></textarea>

        <v-btn dark text @click="editList">Save</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
  import taskAddDialog from '../tasks/task-add-dialog.vue';
  import taskItem from '../tasks/task-item.vue';
  import calendarDialog from './calendar-dialog';

  export default {
    data: () => ({
			showCalendar: false,
      showTaskDialog: false,
      activeTask: null,
      showComplete: false,
      showMenuDialog: false,
			isEditList: false,
			
			list: null
    }),
    computed: {
      listTasks() {
				let list = this.$store.state.todo.activeList;
				let result = {};
        if(list) {
					this.$store.state.projects.lists.map(item => {
						if(item.id === list.id) {
							this.list = item;
						}
					})
          for (let task in list.tasks) {
            if (list.tasks[task].isCompleted === this.showComplete) {
              result[task] = list.tasks[task];
            }
          }
        }
        return result;
      },
    },
    methods: {
      editList() {
        this.$store.dispatch('editProjectList', {
          list: this.editedList,
          id: this.list.id,
        });
        this.isEditList = false;
      },
      startEdit() {
        this.isEditList = true;
        this.editedList = Object.assign({}, this.list);
      },
      removeList() {
        if (confirm('Do you really want to remove this list ?')) {
					this.$store.dispatch('removeProjectList', this.list.id);
        }
      },
    },
    components: {
      taskAddDialog,
			taskItem,
			calendarDialog
    },
  };
</script>

<style>
  .menu-card {
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    overflow: hidden;
    width: 100%;
    background: rgb(33, 33, 47);
    max-width: 400px;
  }
</style>
