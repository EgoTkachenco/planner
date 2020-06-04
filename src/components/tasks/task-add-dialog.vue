<template>
  <div class="dialog-overlay" v-if="show">
    <div class="dialog-card p-3 mx-1">
      <div class="close-btn" @click="close">+</div>
      <div class="h3 text-center">New Task</div>

      <div class="form-group">
        <textarea
          type="text"
          class="form-control text-field"
          id="title"
          rows="3"
          placeholder="Task..."
          v-model="newTask.text"
        />
      </div>
      <div class="d-flex my-2">
        <v-menu offset-y dark>
          <template v-slot:activator="{ on }">
            <v-btn text dark v-on="on">
              Priority
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in colors"
              :key="index"
              @click="newTask.priority = index+1"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn dark text @click="showDatePicker = true">Due Date</v-btn>
        <v-btn dark text @click="addTask" class="ml-auto">
          Save
        </v-btn>
      </div>
      <span v-if="error" class="h4 text-danger mb-5">{{error}}</span>
    </div>

    <div class="dialog-overlay flex-column" v-if="showDatePicker">
        <v-date-picker dark v-model="picker"></v-date-picker>
        <v-btn text dark class="mt-2" v-if="picker" @click="saveDate">Save</v-btn>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['show', 'id'],
    data: () => ({
      newTask: {
        text: '',
        isCompleted: false,
        creationDate: null,
      },
      showDatePicker: false,
      picker: null,
      colors: [
        { title: 'High', color: '#F44336' },
        { title: 'Medium', color: '#FF9800' },
        { title: 'Low', color: '#76FF03' },
      ],

      error: ''
    }),
    methods: {
      addTask() {
        this.newTask.creationDate = new Date();
        this.newTask.listId = this.id;
        this.$store.dispatch('addTask', this.newTask)
          .then(res => {
            if(res) {
              this.error = res;
            } else {
              this.close();
            }
          });
        
        this.close();
      },
      close() {
        this.newTask = {
          text: '',
          isCompleted: false,
          created: null,
        };
        this.$emit('close');
      },
      saveDate() {
        this.newTask.dueDate = new Date(this.picker).getTime();
        this.showDatePicker = false;
        this.picker = null;
      }
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
