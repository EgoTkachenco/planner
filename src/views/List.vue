<template>
  <div class="row text-white pt-5" v-if="list">
    <div class="col-12 d-flex align-items-center">
      <div class="h4 text-left d-flex align-items-center">
        <router-link tag="span" :to="{ name: 'Todo' }">
          <img
            src="../assets/svg/arrow-left.svg"
            width="35"
            class="mr-3"
            alt="back"
          />
        </router-link>
        {{ list.title }}
      </div>
      <div class="ml-auto">
        <v-btn @click="showMenuDialog = true" text>
          <img src="../assets/svg/more.svg" width="30" alt="more" />
        </v-btn>
      </div>
    </div>

    <div class="col-12 text-left my-3 pl-5">
      {{ list.description }}
    </div>

    <div
      class="col-12"
      v-for="(item, index) in listTasks"
      :key="index"
      @click="activeTask === index ? (activeTask = null) : (activeTask = index)"
    >
      <task-item
        :task="item"
        :index="index"
        :isActive="activeTask === index"
      ></task-item>
    </div>

    <task-add-dialog
      :show="showTaskDialog"
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
  import taskAddDialog from '../components/tasks/task-add-dialog.vue';
  import taskItem from '../components/tasks/task-item.vue';

  export default {
    data: () => ({
      showTaskDialog: false,
      activeTask: null,
      showComplete: false,
      showMenuDialog: false,
      isEditList: false,
    }),
    computed: {
      list() {
        return this.$store.state.todo.lists[this.$route.params.id];
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
      editList() {
        this.$store.dispatch('editList', {
          list: this.editedList,
          id: this.$route.params.id,
        });
        this.isEditList = false;
      },
      startEdit() {
        this.isEditList = true;
        this.editedList = Object.assign({}, this.list);
      },
      removeList() {
        if (confirm('Do you really want to remove this list ?')) {
          this.$store.dispatch('removeList', this.id);
        }
      },
    },
    components: {
      taskAddDialog,
      taskItem,
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
